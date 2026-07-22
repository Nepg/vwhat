# 记录一次自己制作 UE4 数值修改模组的全过程

## 为什么要做这件事？

我开的 HumanitZ 无头服务器里，马铃薯堆叠只有 1。捡几个就占满背包，种地收菜跟摆地摊似的，太蠢了。

全网搜了几遍都没有任何现成的服务端堆叠 Mod。客户端倒有几个，但扔进服务端根本不理你 —— 服务端压根不加载客户端的逻辑。

目标单纯得可笑：把马铃薯的堆叠上限从 1 改成 999。

最大的困难？我根本不是搞开发的。C++ 没见过，UE4 怎么运作完全不懂，连命令行都用不利索。

于是我只能硬着头皮，用一堆工具一步步试，走完这条 “拿密钥 → 解包 → 找文件 → 改文件 → 再打包” 的路。

下面的流程写起来很流畅，像是一气呵成。但我当时每一步都卡了少则半天、多则两天，而且根本不知道自己在干什么。

## 1. 拿密钥：AES_finder.exe 是我唯一的救星

服务端 PAK 是加密的，FModel 打不开，必须先搞到 AES 密钥。

![1](/UE4_Mod_ValueDev/1.png)

下载 AES_finder.exe，放到 HumanitZServer-Win64-Shipping.exe 同目录，启动服务器，运行 AES_finder.exe。它会在运行时从内存里捞出密钥，自动生成 key.txt。

打开一看，一串字符：

```
0x321166CACD1E2BBEAC9794AAF468DE277001D2EF8F74A8D6B3CC6EDFE87945CA
```

我也不知道这意味着什么，反正先存着。

## 2. 解包：FModel 的反复折磨

打开 FModel，选定 HumanitZServer 目录，输入刚才那串密钥，选 UE4 版本 —— 我猜了个 4.27，后来证明猜对了，纯属运气。

![2](/UE4_Mod_ValueDev/2.png)

一开始怎么都报错。具体错误忘了，反正就是解包失败。后来我点了 FModel 里的 “更新”，又装了个叫 windowsdesktop-runtime-10.0.9-win-x64.exe 的玩意，莫名其妙就好了。

一般情况下，FModel 会自动识别到目标 PAK 文件，而 HumanitZServer-WindowsServer.pak 正是服务端的核心文件。

![3](/UE4_Mod_ValueDev/3.png)

解包成功后，需要在成千上万个文件里找 “马铃薯”—— 它可能在 Items/Consumables 下面，也可能在 DataTable 里。这个过程就像在一座图书馆里找一本没写书名的书，全靠运气。而我运气向来一般。

后来我灵机一动：N 网上有个客户端的堆叠模组，是 main.lua。看不懂？没关系，丢给 AI。

AI 解码后告诉我关键信息：

- 游戏物品总表叫 DT_ItemDatabase
- 路径是 `/Game/TSS_Game/Data/Localization/DT_ItemDatabase`
- 堆叠属性名带随机后缀，但基础名是 `MaxStackSize`

有了方向。我去 PAK 解出来的文件夹里找到了：

`Content/TSS_Game/Data/Localization/DT_ItemDatabase.uasset`

![4](/UE4_Mod_ValueDev/4.png)

打开，多少行代码？没数，但看起来不低于 60 万。搜索，也能搜到 MaxStackSize 属性。但它改不了 ——FModel 是只读的。必须导出（通常还带一个 .uexp，自动关联），用另一个工具改。

## 3. 编辑：UAssetGUI 的温柔一刀

用 UAssetGUI 打开 DT_ItemDatabase.uasset。

好家伙，整个游戏 700+ 物品全在这里。果然能看到 MaxStackSize。还注意到有个 CanStack，这显然是控制该物品能否堆叠。

![5](/UE4_Mod_ValueDev/5.png)

我挑了几个物品，把 MaxStackSize 改成 999，CanStack 改成 true，保存。

—— 然后呢？怎么打包回去？

我当时并不知道。就去搜。AI 时代，不懂就问，138 亿年唯一不会不耐烦的老师。

## 4. 打包：repak 和那堆破事

用 repak 把修改后的文件重新打包成 .pak。

用法：把 repak.exe 放到要打包的目录，命令行执行：

```
repak.exe pack 文件夹名称 打包后生成的pak文件名称.pak
```

例如：

```
repak.exe pack Stack Stack.pak
```

听着简单吧？可我踩了三个大坑，加起来卡了不知道多少天。

### 坑一：重新加密

一开始不生效，我以为是打包出来的 PAK 也要加密。但 repak 只能打包，不能加密。我到处找办法，甚至考虑过下载安装原版 UE4 引擎来搞 —— 后来硬着头皮忽略这个问题继续往下走。也不知道当时怎么想的，反正就这样了。

### 坑二：路径结构

打包的时候我没注意 ——DT_ItemDatabase.uasset 所在路径是 `Content/TSS_Game/Data/Localization/`。我直接把文件扔进根目录打包，结果游戏根本读不到。正确的做法是：打包时保持完整的相对路径，让 .pak 内部结构是 `Content/TSS_Game/Data/Localization/DT_ItemDatabase.uasset`。

### 坑三：文件名优先级

我把生成的 .pak 起名叫 123.pak，放进 Paks 目录。不生效。为什么？因为 UE4 加载 PAK 是按字母顺序的，123.pak 的优先级低于 HumanitZServer-WindowsServer.pak，所以被原文件覆盖了。

我怎么发现的？我被卡了两天后，灵机一动把原版 PAK 重命名为 0_HumanitZServer-WindowsServer.pak，模组终于生效了 —— 但后来问 AI 才知道，建议做法是让 Mod PAK 的文件名以 z 开头，尾部带 “下划线 p”，比如 zStack_P.pak。UE4 会把这种命名识别为补丁文件，优先级高于原始 PAK。至于为什么，咱也不懂，反正能跑。

## 5. 验证：两周的成果

把打包好的 .pak 复制到 Paks 目录，和 HumanitZServer-WindowsServer.pak 放一起。

我最终给它起名 ZzzHlSvrStack_p.pak—— 够靠后，绝对能覆盖原文件。

启动服务端，进入游戏，捡起马铃薯 ——

999。 成了。

测试了多少次？我没数。反正从开始到这一步，已经过去两周了。

## 6. 脚本：700 多个物品不能一个一个改

问题是：700 多个物品，我一个一个改？那不现实。

搜了一下，UAssetGUI 支持执行脚本。需要一些设置：

1. 设置允许执行脚本

![6](/UE4_Mod_ValueDev/6.png)

2. 新增脚本

![7](/UE4_Mod_ValueDev/7.png)

3. 编辑脚本

![8](/UE4_Mod_ValueDev/8.png)

问题又来了，脚本是什么？我哪知道。AI 时代，问 AI。

我把 UAssetGUI 的脚本模板发给 AI，AI 说要先分析对象结构……

又过了不知道多久，几十个对话后，AI 成功分析出了数据结构，生成了一个批量修改脚本。我配了个黑名单 blacklist.txt，排除不想改的物品（比如某些改了就崩游戏的关键道具）。

执行脚本，成功修改全部目标物品。

保存。保存。保存。你猜我为什么说三遍？—— 因为前两次脚本跑完我没保存，全白干了。

![9](/UE4_Mod_ValueDev/9.png)

## 7. 总结：所以到底得到了什么？

成功把马铃薯堆叠变成 999。

但冷静下来想想 —— 堆叠改了以后，游戏瞬间变得太简单。捡一次够用一星期，再也没有 “取舍” 的纠结。我又怀念起原来只有 1 个的苦日子了。

人真是矛盾。
