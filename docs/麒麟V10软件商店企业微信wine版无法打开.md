> **问题描述**：从软件商店安装的企业微信（`kylin-wine-wecom`）启动后无任何窗口或错误提示。

## 一、问题分析

### 1.1 分析环境

#

| 类别       | 说明                              |
| ---------- | --------------------------------- |
| CPU 架构   | ARM64                             |
| 处理器     | 麒麟 9000X                        |
| 操作系统   | 银河麒麟桌面操作系统 V10          |
| glibc 版本 | 2.31（查询命令：`ldd --version`） |

### 1.2 依赖检查

执行以下命令查看软件包依赖关系：

```bash
apt-cache depends kylin-wine-wecom
```

输出结果：

```
kylin-wine-wecom
  依赖: wine10-w64
  依赖: squashfs-tools
  |依赖: <kylin-kwre-phybin>
  依赖: kylin-kwre-exagear
```

### 1.3 直接运行 winecfg 检查兼容性

绕过启动脚本，直接调用 Wine 配置工具：

```bash
/opt/kylin-wine/wine10-w64/bin/winecfg
```

错误信息：

```
/opt/kylin-wine/wine10-w64/bin/winecfg: /lib/x86_64-linux-gnu/libc.so.6:
version `GLIBC_2.34' not found
```

**分析**：`kylin-wine-wecom` 所依赖的 `wine10-w64` 需要 glibc ≥ 2.34，而当前系统仅提供 2.31；同时该二进制为 x86 架构，无法在 ARM 平台上直接运行。该路径不可行。

### 1.4 换用 wine8-32 测试

安装与 glibc 2.31 兼容的 `wine8-32`（版本 8.0.4）后运行，出现如下错误：

```
ERROR: ld.so: object '/opt/apps/net.zhongfu.appma/libzfh_sock_x86_64.so'
from /etc/ld.so.preload cannot be preloaded (wrong ELF class: ELFCLASS64)
Inconsistency detected by ld.so: ... Assertion `sym != NULL' failed!
```

**分析**：系统 `/etc/ld.so.preload` 强制加载了一个 x86_64 架构的预加载库（属于中孚保密软件），ARM 动态链接器在处理该库时崩溃。尝试 `export LD_PRELOAD=""` 或注释 `/etc/ld.so.preload` 均无法绕过，且该文件在部署环境中不可删除或禁用。此路径亦不可行。

### 1.5 使用 kylin-kwre-wecom 版本

安装专门适配的 `kylin-kwre-wecom`（基于 ExaGear + CrossOver）：

```bash
sudo apt update
sudo apt install kylin-kwre-wecom -y
```

安装后启动，界面与二维码显示正常，但手机扫码后服务器返回“副机版本过低”。查看版本信息为 `4.1.16.6007`，该版本已被企业微信服务器列入低版本黑名单；而当前 `kylin-kwre-wecom` 软件包已是软件源中的最新版本，因此常规更新无法解决该问题。

### 1.6 当前情况汇总

| 方案                     | 状态                | 失败原因 / 环境限制                             | 处理                              | 可行性 |
| ------------------------ | ------------------- | ----------------------------------------------- | --------------------------------- | ------ |
| 商店版 kylin-wine-wecom  | ❌ 无响应           | wine10-w64 依赖 glibc 2.34，系统仅 2.31，不满足 | 尝试更换低版本 Wine（结果见下行） | 不可行 |
| 独立 wine8-32            | ❌ 冲突             | 中孚预加载库与 ARM 动态链接器冲突               | 禁用 ld.so.preload，操作失败      | 不可行 |
| kwre 版 kylin-kwre-wecom | ⚠️ 可启动但版本过低 | 版本 4.1.16 被服务器拦截，官方源无更新计划      | 尝试手动升级容器内企业微信版本    | 待尝试 |

## 二、ARM 架构解决方案

> **适用场景**：ARM64（飞腾、鲲鹏等）环境，系统 glibc < 2.34，且存在系统预加载库冲突。
>
> **核心思路**：利用 `kylin-kwre-wecom` 容器环境，手动升级容器内企业微信版本，并更换 CrossOver 23 引擎解决新版登录黑屏问题。

### 2.1 安装 kwre 版企业微信

执行以下命令，安装麒麟软件仓库中的 `kylin-kwre-wecom`。该步骤自动创建用于运行企业微信的 Wine 容器（容器名称固定为 `wecom`）：

```bash
sudo apt update
sudo apt install kylin-kwre-wecom -y
```

> `kylin-kwre-wecom` 的版本为 `4.1.16.6007`，该版本扫码登录时会提示版本过低，需后续升级。

### 2.2 获取最新版 Windows 客户端安装程序

从企业微信官方网站下载 Windows 平台的最新安装包（示例文件名为 `WeCom_5.0.9.6063.exe`），并将文件保存至当前用户的桌面目录。

### 2.3 使用 CrossOver 21 执行安装包以更新容器内程序文件

调用 CrossOver 21 的 Wine 二进制文件，指定容器 `wecom`，运行下载的安装包，完成企业微信的版本更新：

```bash
/opt/cxoffice21/bin/wine --bottle wecom "/home/用户名/桌面/WeCom_5.0.9.6063.exe"
```

> 将命令中的 “用户名” 替换为当前实际登录的用户名。
>
> **安装过程中的异常处理**：进度至 93% 时可能提示「不能打开要写入的文件: WXWork.exe」，选择 **忽略**，完成剩余文件解压。

### 2.4 安装 CrossOver 23 引擎

企业微信版本 `5.0.9.6063` 在使用 CrossOver 21 引擎登录后会出现窗口黑屏、闪退及 “错误报告” 对话框。为此，需要部署 CrossOver 23 引擎。

将 CrossOver 23 的 Debian 安装包（文件名为 `kylin-kwre-crossover23_0.1-1_arm64.deb`）存放于桌面，并执行安装：

```bash
cd ~/桌面
sudo dpkg -i kylin-kwre-crossover23_0.1-1_arm64.deb
```

若安装时提示缺少依赖项，则执行以下命令修复依赖关系：

```bash
sudo apt --fix-broken install -y
```

### 2.5 验证 CrossOver 23 的 Wine 可执行文件路径

检查 `/opt/cxoffice23/bin/wine` 文件是否存在，以确认新引擎安装成功：

```bash
ls /opt/cxoffice23/bin/wine
```

若命令输出该文件路径，则表示 CrossOver 23 引擎已就绪。

### 2.6 使用 CrossOver 23 引擎启动企业微信

调用 CrossOver 23 的 Wine 命令，指定容器 `wecom`，运行已升级的企业微信主程序（`WXWork.exe`），启动应用：

```bash
/opt/cxoffice23/bin/wine --bottle wecom "C:\Program Files\WXWork\WXWork.exe"
```

**验证结果**：

- 二维码正常渲染显示；
- 扫码不再提示「客户端版本过低」；
- 登录后界面正常，无黑屏及闪退。

---

## 三、x86 架构解决方案

> **适用场景**：x86_64 环境，但同样受限于 glibc 版本或系统预加载库冲突，且官方源版本过旧。
>
> **核心思路**：保留 kwre 容器环境，手动更新版本并修复「不能打开要写入的文件: WXWork.exe」

### 3.1 安装企业微信 kwre 基础环境

```bash
sudo apt update
sudo apt install kylin-kwre-wecom -y
```

该命令自动安装 `kylin-kwre-exagear`（ARM→x86 指令转译层，x86 环境下可能不需要但无妨）与 CrossOver 运行时依赖。

### 3.2 获取新版 Windows 安装包

从企业微信官网下载 Windows 客户端安装程序（示例：`WeCom_5.0.9.6063.exe`），保存至当前用户桌面。

### 3.3 在 CrossOver 容器内执行安装包实现版本升级

查看现有容器名称（默认固定为 `wecom`）：

```bash
ls /opt/cxoffice/support/
```

执行容器安装命令（路径为 `/opt/cxoffice/bin/wine`，而非 `cxoffice21`）：

```bash
/opt/cxoffice/bin/wine --bottle wecom "/home/用户名/桌面/WeCom_5.0.9.6063.exe"
```

- `--bottle wecom`：指定使用 `wecom` 容器，容器数据路径 `~/.cxoffice/wecom`；
- 安装向导默认路径：`C:\Program Files\WXWork`；
- 进度至 93% 提示「不能打开要写入的文件: WXWork.exe」，选择 **忽略**，完成剩余文件解压。

### 3.4 手动替换新版 WXWork.exe 主程序

报错原因为进程占用 / 容器文件锁导致主程序写入失败，需手动覆盖：

1. 准备与安装包同版本的 `WXWork.exe`（可从 Windows 机器上的企业微信安装目录获取），放到桌面；
2. 备份容器旧主程序：

```bash
mv ~/.cxoffice/wecom/drive_c/Program\ Files/WXWork/WXWork.exe \
   ~/.cxoffice/wecom/drive_c/Program\ Files/WXWork/WXWork.exe.bak
```

3. 复制新版文件至容器目录：

```bash
cp "/home/用户名/桌面/WXWork.exe" \
   ~/.cxoffice/wecom/drive_c/Program\ Files/WXWork/
```

### 3.5 启动验证

```bash
/opt/cxoffice/bin/wine --bottle wecom "C:\Program Files\WXWork\WXWork.exe"
```

**验证结果**：

- 二维码正常渲染显示；
- 扫码不再提示「客户端版本过低」；
- 登录后界面正常，无黑屏及闪退。

---

### 3.6、技术原理说明

#### 3.6.1 绕过 glibc 版本依赖机制

`kylin-kwre-wecom` 依托 ExaGear 实现 ARM → x86 指令实时转译（在 x86 环境下则直接运行），上层运行 CrossOver。运行时不调用宿主机 glibc（或使用内置兼容库），彻底规避宿主系统 glibc 版本限制。

#### 3.6.2 规避系统预加载库冲突机制

使用 `/opt/cxoffice/bin/wine --bottle wecom`（或 `cxoffice23`）启动时，进程完全隔离在容器空间内；容器拥有独立动态链接加载逻辑，不会读取宿主 `/etc/ld.so.preload` 预加载配置，杜绝 ARM 链接器加载 x86_64 保密库导致崩溃问题。

#### 3.6.3 直接替换 exe 主程序可行原理

CrossOver 容器模拟完整 Windows C 盘目录，注册表、运行依赖 DLL、用户配置全部隔离存储在 `~/.cxoffice/wecom`。`WXWork.exe` 为独立业务主程序，小版本迭代不会变更底层 Wine/CrossOver 依赖，仅替换该文件即可完成升级，无需重建容器。

---

## 四、限制与注意事项

表格

| 事项         | 详细说明                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------ |
| 容器名称固定 | 仅支持 `wecom`，容器数据路径 `~/.cxoffice/wecom`，不可自定义修改                           |
| 强制启动命令 | 必须使用 `/opt/cxoffice/bin/wine --bottle wecom`（或 `cxoffice23`），禁止直接调用系统 wine |
| 文件版本匹配 | 替换的 `WXWork.exe` 需和安装包版本完全一致，跨大版本易缺失依赖、功能异常                   |
| 首次启动性能 | 首次打开较慢（ExaGear 生成指令缓存），二次及后续启动速度恢复正常                           |
| ARM 特殊注意 | 若使用 CrossOver 21 出现黑屏，需安装 CrossOver 23 引擎并改用 `cxoffice23` 启动             |
| x86 特殊注意 | 通常无需更换引擎，直接使用 `/opt/cxoffice/bin/wine` 即可                                   |

## 五、适用范围

本方案适用于银河麒麟桌面操作系统 V10（glibc 2.31）且存在强制预加载保密库（如中孚）且策略禁止禁用/修改的环境。

不适用场景：

无系统级约束且 glibc ≥ 2.34 的环境（可直接使用商店版）；

非麒麟系统或未提供 kylin-kwre-\* 包的发行版。
