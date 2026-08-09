# UOS LiveCD 环境安装 衍星LiveCD工具

## 基础说明

### 1. 适用环境

统信 UOS 20 系列试用模式

### 2. 目标程序

衍星软件工作室 LiveCD Tools 2.0

### 3. 安装包类型

表格

| 架构或型号    | 安装包类型 | 文件名                                        |
| ------------- | ---------- | --------------------------------------------- |
| x86_64        | Debian     | `com.cnoshome.livecdtools_2.0.0_amd64.deb`    |
| ARM64         | Debian     | `com.cnoshome.livecdtools_2.0.0_arm64.deb`    |
| L420 ~ L540   | tar.gz     | `com.cnoshome.livecdtools_L420-L540.tar.gz`   |
| W515y ~ W585y | tar.gz     | `com.cnoshome.livecdtools_W515y-W585y.tar.gz` |

### 4. 前置部署条件

安装包放置于系统桌面目录，完整路径：`/home/uos/Desktop/`

安装方案根据安装包类型执行

## 方案一：deb 安装包部署流程

1. 切换至 root 管理员权限

```bash
sudo -i
```

2. 临时关闭系统 ELF 强制签名校验

```bash
echo 0 > /usr/share/deepin-elf-verify/mode
systemctl restart deepin-elf-verify.service
```

3. 执行 deb 包安装操作

```bash
dpkg -i /home/uos/Desktop/com.cnoshome.livecdtools_2.0.0_amd64.deb
```

4. 尝试启动并验证程序可用性

```bash
/opt/apps/com.cnoshome.livecdtools/files/bin/livecdtools_v2_frontend
```

5. 依赖修复（安装流程出现依赖缺失报错时执行）

::: details

```bash
apt update
apt install -f
```

:::

## 方案二：tar.gz 便携压缩包部署流程

1. 切换至 root 管理员权限

```bash
sudo -i
```

2. 临时关闭 ELF 强制签名校验

```bash
echo 0 > /usr/share/deepin-elf-verify/mode
systemctl restart deepin-elf-verify.service
```

3. 解压压缩包至系统根目录

```bash
tar -xzf /home/uos/Desktop/com.cnoshome.livecdtools_2.0.0_amd64.tar.gz -C /
```

4. 尝试启动并验证程序可用性

```
/opt/apps/com.cnoshome.livecdtools/files/bin/livecdtools_v2_frontend
```

5. 赋予程序二进制文件执行权限(无法启动时执行)

::: details

```bash
chmod +x /opt/apps/com.cnoshome.livecdtools/files/bin/*
chmod +x /usr/bin/com.cnoshome.livecdtools*
```

:::

## 其它命令

1. 恢复 ELF 签名校验配置

```bash
echo 1 > /usr/share/deepin-elf-verify/mode
systemctl restart deepin-elf-verify.service
```

## 故障排查对照表

| 故障现象 / 报错信息                                               | 故障根因                             | 标准化处置步骤                                                                                           |
| ----------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `dpkg: error: cannot access archive`                              | deb 文件路径或文件名参数错误         | 执行文件检索命令确认本地实际文件名称：`ls -l /home/uos/Desktop/*.deb`                                    |
| 安装过程提示依赖缺失（示例：libqt5core5a）                        | 系统缺失程序运行依赖库               | 执行依赖自动修复命令：`apt install -f`                                                                   |
| 程序启动无图形窗口，输出报错`cannot connect to display`           | 终端进程未绑定图形显示输出           | 执行环境变量配置`export DISPLAY=:0`后重新启动程序；或直接使用图形桌面终端执行启动命令                    |
| 执行`systemctl restart deepin-elf-verify.service`提示服务重启失败 | 当前 LiveCD 镜像版本未内置该校验服务 | 通过`systemctl status deepin-elf-verify`确认服务状态；无对应服务时仅修改 mode 文件即可生效，无需重启服务 |
| 执行`tar -xzf`解压命令后目标目录无程序文件                        | 压缩包文件路径、文件名参数错误       | 执行检索命令确认压缩包存在：`ls -l /home/uos/Desktop/*.tar.gz`                                           |
| 解压完成后桌面应用菜单无程序图标                                  | 桌面图标缓存未更新                   | 执行`update-desktop-database`，注销当前会话或重启桌面环境生效                                            |
| 程序启动提示权限不足                                              | 二进制可执行文件未配置执行权限       | 赋予二进制目录全部文件执行权限：`chmod +x /opt/apps/com.cnoshome.livecdtools/files/bin/*`                |
