# 麒麟V10软件商店企业微信wine版无法打开

> 问题：从软件商店安装的企业微信（`kylin-wine-wecom`）启动后无任何窗口或错误提示弹出。

> 以下记录在麒麟 V10（ARM64，glibc 2.31）操作系统上部署企业微信，核心方案采用 `kylin-kwre-wecom` 提供的 ExaGear + CrossOver 容器环境，并解决因客户端版本过低导致登录失败问题的过程。

## 一、环境信息

| 项目       | 参数                             |
| ---------- | -------------------------------- |
| 操作系统   | 麒麟 V10 ARM64（飞腾/鲲鹏/麒麟） |
| glibc 版本 | 2.31                             |

## 二、故障排查

### 2.1 依赖检查

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

### 2.2 直接运行 winecfg 检查兼容性

绕过启动脚本，直接调用 Wine 配置工具：

```bash
/opt/kylin-wine/wine10-w64/bin/winecfg
```

错误信息：

```
/opt/kylin-wine/wine10-w64/bin/winecfg: /lib/x86_64-linux-gnu/libc.so.6:
version `GLIBC_2.34' not found
```

查询当前系统 GLIBC 版本：

```bash
ldd --version
```

**分析**：`kylin-wine-wecom` 所依赖的 `wine10-w64` 需要 glibc ≥ 2.34，而当前系统仅提供 2.31；同时该二进制为 x86 架构，无法在 ARM 平台上直接运行。该路径不可行。

### 2.3 换用 wine8-32 测试

安装与 glibc 2.31 兼容的 `wine8-32`（版本 8.0.4）后运行，出现如下错误：

```
ERROR: ld.so: object '/opt/apps/net.zhongfu.appma/libzfh_sock_x86_64.so'
from /etc/ld.so.preload cannot be preloaded (wrong ELF class: ELFCLASS64)
Inconsistency detected by ld.so: ... Assertion `sym != NULL' failed!
```

**分析**：系统 `/etc/ld.so.preload` 强制加载了一个 x86_64 架构的预加载库（属于中孚保密软件），ARM 动态链接器在处理该库时崩溃。尝试 `export LD_PRELOAD=""` 或注释 `/etc/ld.so.preload` 均无法绕过，且该文件在部署环境中不可删除或禁用。此路径亦不可行。

### 2.4 使用 kylin-kwre-wecom 版本

安装专门适配的 `kylin-kwre-wecom`（基于 ExaGear + CrossOver）：

```bash
sudo apt install kylin-kwre-wecom -y
```

安装后启动，界面和二维码正常显示，但手机扫码后被服务器拒绝，提示 “副机版本过低”。查看版本信息：

```bash
ls /opt/cxoffice/support/wecom/drive_c/Program\ Files/WXWork/
```

显示版本为 `4.1.16.6007`，该版本已被企业微信服务器列入低版本黑名单。`kylin-kwre-wecom` 软件包自身不提供在线升级功能。

### 2.5 当前情况汇总

| 方案                     | 状态                | 失败原因 / 环境限制                       | 常规解决思路       |
| ------------------------ | ------------------- | ----------------------------------------- | ------------------ |
| 商店版 kylin-wine-wecom  | ❌ 无响应           | wine10-w64 依赖 glibc 2.34，系统仅为 2.31 | 换低版本 Wine      |
| 独立 wine8-32            | ❌ 冲突             | 中孚预加载库与 ARM 动态链接器冲突         | 禁用 ld.so.preload |
| kwre 版 kylin-kwre-wecom | ⚠️ 可启动但版本过低 | 4.1.16 版本被服务器拦截，官方源无更新排期 | 等待官方更新       |

## 三、解决方案

### 3.1 对策

鉴于上述情况，最终采用保留 kwre 容器环境、手动升级容器内部企业微信版本的方式绕过所有限制。

### 3.2 实施步骤

#### 步骤 1：安装企业微信 kwre 基础环境

```bash
sudo apt update
sudo apt install kylin-kwre-wecom -y
```

该命令自动安装 `kylin-kwre-exagear`（ARM→x86 指令转译层）与 CrossOver 运行时依赖。

#### 步骤 2：获取新版 Windows 安装包

从企业微信官网下载 Windows 客户端安装程序（示例：`WeCom_5.0.9.6063.exe`），保存至当前用户桌面。

#### 步骤 3：在 CrossOver 容器内执行安装包实现版本升级

查看现有容器名称（默认固定为 `wecom`）：

```bash
ls /opt/cxoffice/support/
```

执行容器安装命令：

```bash
/opt/cxoffice/bin/wine --bottle wecom "/home/用户名/桌面/WeCom_5.0.9.6063.exe"
```

- `--bottle wecom`：指定使用 wecom 容器，容器数据路径 `~/.cxoffice/wecom`
- 安装向导默认路径：`C:\Program Files\WXWork`
- 进度至 93% 提示「不能打开要写入的文件: WXWork.exe」，选择 **忽略**，完成剩余文件解压

#### 步骤 4：手动替换新版 WXWork.exe 主程序

报错原因为进程占用 / 容器文件锁导致主程序写入失败，需手动覆盖：

1. 准备与安装包同版本 `WXWork.exe`（可从Windows机器上的企业微信安装目录找到），放到桌面
2. 备份容器旧主程序

```bash
mv ~/.cxoffice/wecom/drive_c/Program\ Files/WXWork/WXWork.exe \
   ~/.cxoffice/wecom/drive_c/Program\ Files/WXWork/WXWork.exe.bak
```

3. 复制新版文件至容器目录

```bash
cp "/home/用户名/桌面/WXWork.exe" \
   ~/.cxoffice/wecom/drive_c/Program\ Files/WXWork/
```

#### 步骤 5：启动验证

```bash
/opt/cxoffice/bin/wine --bottle wecom "C:\Program Files\WXWork\WXWork.exe"
```

验证结果：

- 二维码正常渲染显示
- 扫码不再提示「客户端版本过低」
- 短信 / 验证码登录流程正常完成

## 四、其它说明

### 4.1 绕过 glibc 版本依赖机制

`kylin-kwre-wecom` 依托 ExaGear 实现 ARM → x86 指令实时转译，上层运行 CrossOver。

运行时不调用宿主机 glibc 2.31，而是使用 ExaGear 内置独立 x86 文件系统（自带适配 libc），彻底规避宿主系统 glibc 版本限制。

### 4.2 规避系统预加载库冲突机制

使用 `/opt/cxoffice/bin/wine --bottle wecom` 启动时，进程完全隔离在 ExaGear 容器空间内；

容器拥有独立动态链接加载逻辑，不会读取宿主 `/etc/ld.so.preload` 预加载配置，杜绝 ARM 链接器加载 x86_64 保密库导致崩溃问题。

### 4.3 直接替换 exe 主程序可行原理

CrossOver 容器模拟完整 Windows C 盘目录，注册表、运行依赖 DLL、用户配置全部隔离存储在 `~/.cxoffice/wecom`。

`WXWork.exe` 为独立业务主程序，小版本迭代不会变更底层 Wine/CrossOver 依赖，仅替换该文件即可完成升级，无需重建容器。

## 五、后续升级操作备忘

后续再次提示版本过低时，无需重装 kwre 环境，执行“3.2 步骤 2 ~ 4 ”流程即可

## 六、限制与注意事项

| 事项         | 详细说明                                                                |
| ------------ | ----------------------------------------------------------------------- |
| 容器名称固定 | 仅支持 `wecom`，容器数据路径 `~/.cxoffice/wecom`，不可自定义修改        |
| 强制启动命令 | 必须使用 `/opt/cxoffice/bin/wine --bottle wecom`，禁止直接调用系统 wine |
| 文件版本匹配 | 替换的 WXWork.exe 需和安装包版本完全一致，跨大版本易缺失依赖、功能异常  |
| 首次启动性能 | 首次打开较慢（ExaGear 生成指令缓存），二次及后续启动速度恢复正常        |

## 七、适用范围

本方案仅适配以下环境组合：

1. 操作系统：麒麟 V10 ARM64 / 同源国产 ARM 服务器 / 终端系统
2. 宿主机 glibc 版本 < 2.34
3. 系统存在强制预加载保密库（如中孚）且策略禁止禁用 / 修改
4. 官方软件源内置企业微信版本老旧，但 kwre 容器环境可正常运行
5. 可自行获取 Windows 企业微信安装包与对应版本 WXWork.exe 文件

不适用场景：

- x86 架构、glibc ≥ 2.34、或无特殊系统级约束的环境（此类环境可直接使用商店版或官方 deb 包）。
