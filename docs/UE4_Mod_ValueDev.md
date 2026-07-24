# 制作 UE4 数值修改模组（HumanitZ）

## 问题

HumanitZ 无头服务器，马铃薯堆叠上限为 1。服务端无现成 Mod，客户端 Mod 不生效。

## 目标

将马铃薯堆叠上限改为 999。

## 流程

### 1. 获取 AES 密钥

- 工具：`AES_finder.exe`
- 操作：与 `HumanitZServer-Win64-Shipping.exe` 同目录，启动服务器后运行 `AES_finder.exe`，生成 `key.txt`
- 结果：获取 AES 密钥

![1](/UE4_Mod_ValueDev/1.png)

### 2. 解包

- 工具：`FModel`
- 操作：
  - 选定 HumanitZServer 目录
  - 输入 AES 密钥
  - 选择 UE4 版本 4.27

  ![2](/UE4_Mod_ValueDev/2.png)

- 踩坑记录：

| 问题        | 原因                   | 解决方案                                                      |
| ----------- | ---------------------- | ------------------------------------------------------------- |
| FModel 报错 | 缺少运行环境或版本过旧 | 更新 FModel，安装 `windowsdesktop-runtime-10.0.9-win-x64.exe` |

- 目标文件：`HumanitZServer-WindowsServer.pak`

![3](/UE4_Mod_ValueDev/3.png)

- 关键文件定位：
  - 通过客户端 Mod（Ultimate_Ztack 里的 `main.lua`）分析得知
  - 物品总表：`DT_ItemDatabase`
  - 路径：`/Game/TSS_Game/Data/Localization/DT_ItemDatabase`
  - 堆叠属性：`MaxStackSize`

![4](/UE4_Mod_ValueDev/4.png)

### 3. 编辑

- 工具：`UAssetGUI`
- 操作：
  - 打开 `DT_ItemDatabase.uasset`
  - 修改 `MaxStackSize` 为 999
  - 修改 `CanStack` 为 true
  - 保存

![5](/UE4_Mod_ValueDev/5.png)

### 4. 打包

- 工具：`repak`
- 命令：

  `repak.exe pack 文件夹名称 输出文件名.pak`

- 踩坑记录：

| 问题         | 原因                         | 解决方案                                               |
| ------------ | ---------------------------- | ------------------------------------------------------ |
| 不生效       | 以为需要重新加密             | 实际上不需要加密，忽略此问题                           |
| 游戏读不到   | 打包时未保持相对路径         | 保留 `Content/TSS_Game/Data/Localization/` 结构        |
| 被原文件覆盖 | PAK 按字母顺序加载，优先级低 | 文件名以 z 开头，尾部加 `_p`，如 `ZzzHlSvrStack_p.pak` |

### 5. 验证

- 放置路径：Paks 目录
- 结果：马铃薯堆叠上限变为 999

### 6. 批量修改

- 背景：`DT_ItemDatabase` 含 700+ 物品，需批量修改
- 工具：UAssetGUI 脚本功能
- 操作：

1. 启用脚本执行
   ![6](/UE4_Mod_ValueDev/6.png)
2. 新增脚本
   ![7](/UE4_Mod_ValueDev/7.png)
3. 编辑脚本
   ![8](/UE4_Mod_ValueDev/8.png)

- 脚本生成：
  - 分析 UAssetGUI 脚本模板
  - 分析对象数据结构
  - 生成批量修改脚本
  - 配置 `blacklist.txt`，排除特定物品
- 执行：成功修改全部目标物品

- 踩坑记录：

| 问题           | 原因         | 解决方案                           |
| -------------- | ------------ | ---------------------------------- |
| 脚本跑完没生效 | 修改后未保存 | 执行脚本后记得保存，否则修改不生效 |

![9](/UE4_Mod_ValueDev/9.png)
