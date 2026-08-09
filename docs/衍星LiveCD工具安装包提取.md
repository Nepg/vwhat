# 衍星 LiveCD 工具安装包提取操作手册

## 1 需求概述

从衍星软件工作室定制版 UOS 20 LiveCD ISO 镜像中，分离导出独立 `.deb` 安装包或绿色 `.tar.gz` 压缩部署包。

### 2.1 运行环境

- Linux 环境：Ubuntu 20.04 及以上发行版
- Windows环境：用于直接提取内置 deb 包

### 2.2 必备文件

衍星定制 UOS 20 LiveCD ISO 镜像文件

## 3 两种提取方案

### 方案一：直接提取内置 .deb 安装包

适用场景：ISO 镜像内部预置独立 deb 安装包

1. Windows 操作流程
   
   1）挂载目标 ISO 镜像至本地盘符；
   
   2）进入挂载目录下 `live` 文件夹，定位 `filesystem.squashfs` 文件；
   
   3）使用 7-Zip 打开该 `squashfs`文件，进入内部 `tmp/` 目录；
   
   4）若目录存在后缀为 `.deb` 的文件，直接复制导出，无需执行方案二。

### 方案二：目录打包生成 .tar.gz 绿色包（无内置 deb 时使用）

适用场景：镜像未提供独立 deb 安装包，衍星工具完整嵌入 LiveCD 根文件系统目录

#### 3.1 依赖组件安装

```
sudo apt update && sudo apt install squashfs-tools -y
```

#### 3.2 完整操作流程

```
# 1. 解压squashfs根文件系统（耗时3~5分钟，磁盘预留≥5GB空闲空间）
sudo unsquashfs /mnt/live/filesystem.squashfs

# 2. 切换至解压根目录
cd squashfs-root

# 3. 打包工具全关联目录，文件名自动携带硬件架构标识
sudo tar -czf ../com.cnoshome.livecdtools_$(uname -m).tar.gz \
 opt/apps/com.cnoshome.livecdtools \
 usr/bin/com.cnoshome.livecdtools* \
 usr/share/applications/com.cnoshome.livecdtools.desktop \
 usr/share/dbus-1/system-services/com.cnoshome.livecdtools.service \
 usr/share/dbus-1/system.d/com.cnoshome.livecdtools.conf \
 usr/share/icons/hicolor/scalable/apps/com.cnoshome.livecdtools.svg \
 etc/skel/.config/autostart/com.cnoshome.livecdtools.desktop \
 etc/skel/Desktop/com.cnoshome.livecdtools.desktop

# 4. 将成品压缩包复制至桌面，便于取用
cp ../com.cnoshome.livecdtools_*.tar.gz ~/Desktop/

# 5. 清理解压缓存目录，释放磁盘空间
cd ..
sudo rm -rf squashfs-root
```

## 4 提取文件完整性校验

### 4.1 .deb 安装包校验

```
# 读取deb内部目录结构，输出前10行用于校验
dpkg -c ~/Desktop/com.cnoshome.livecdtools_2.0.0_amd64.deb | head -10
```

校验标准：输出日志包含 `opt/`、`usr/` 工具核心目录，文件结构正常。

### 4.2 .tar.gz 绿色包校验

```
# 读取压缩包内文件清单，输出前10行用于校验
tar -tzf ~/Desktop/com.cnoshome.livecdtools_*.tar.gz | head -10
```

校验标准：输出日志包含主程序目录 `opt/apps/com.cnoshome.livecdtools/`，打包完整。

## 5 异常故障处理对照表



| 异常现象                                | 标准处理方案                                                 |
| ----------------------------------- | ------------------------------------------------------ |
| ISO 镜像无法自动挂载识别                      | 手动挂载镜像文件：`sudo mount -o loop /镜像完整路径.iso /mnt`         |
| 执行 unsquashfs 提示 File exists（目录已存在） | 先删除历史解压目录：`sudo rm -rf squashfs-root`                  |
| 解压报错：not a squashfs filesystem      | 核对 squashfs 文件路径；全局检索文件：`find /mnt -name "*.squashfs"` |
| 导出 deb 文件实际为 zip 伪封装                | 使用`file`命令判定文件类型；确认为 zip 后解压，切换至方案二打包                  |
| 输出 tar.gz 压缩包体积偏大                   | 修改打包命令，剔除`/usr/share/doc`等非必要文档目录后重新打包                 |
