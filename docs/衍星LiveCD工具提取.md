# 衍星 LiveCD 工具提取

## 1. 期望

从衍星软件工作室 UOS LiveCD ISO 镜像中提取 LiveCD 工具。

## 2. 前置准备

- 衍星 UOS 20 LiveCD ISO 镜像文件

- Linux 环境：Ubuntu 20.04 及以上发行版

- Windows 环境：适用可直接提取镜像内置 `.deb` 文件

## 3. 提取方案

###### 3.1 Windows 提取 ISO 内置 .deb

1. 挂载目标 ISO 镜像（双击镜像 / 右键选择「装载」）；

2. 进入挂载分区 `live` 文件夹，找到 `filesystem.squashfs`；

3. 使用 7-Zip 打开该 squashfs 文件，进入内部 `tmp/` 目录；

4. 检查该目录下是否存在 `.deb` 文件：
   - **存在** → 直接复制导出本地，提取完成；
   - **不存在** → 该镜像不含内置安装包，跳转至 3.2 备选方案。

---

### 3.2 从根文件系统打包生成 tar.gz

1.安装解压依赖工具

```bash
sudo apt update && sudo apt install squashfs-tools -y
```

2.查询已挂载光驱 / 镜像

```bash
df -h | grep -E "iso|cdrom|sr0"
```

3.解压 squashfs 根文件系统

```bash
# 进入桌面目录
cd ~/桌面/

# 解压大约耗时3~5分钟，建议磁盘预留空间≥5GB
sudo unsquashfs "/挂载点/用户名/UOS 20/live/filesystem.squashfs"
```

5.打包生成 tar.gz 包

```bash
# 进入squashfs-root目录
cd ~/桌面/squashfs-root

sudo tar -czf ../com.cnoshome.livecdtools_xxx.tar.gz \
  opt/apps/com.cnoshome.livecdtools \
  usr/bin/com.cnoshome.livecdtools* \
  usr/share/applications/com.cnoshome.livecdtools.desktop \
  usr/share/dbus-1/system-services/com.cnoshome.livecdtools.service \
  usr/share/dbus-1/system.d/com.cnoshome.livecdtools.conf \
  usr/share/icons/hicolor/scalable/apps/com.cnoshome.livecdtools.svg \
  etc/skel/.config/autostart/com.cnoshome.livecdtools.desktop \
  etc/skel/Desktop/com.cnoshome.livecdtools.desktop
```

6.清理解压缓存释放磁盘

```bash
cd ..
sudo rm -rf squashfs-root
```

## 4. 文件校验

### 4.1 .deb 校验

```bash
dpkg --info ~/桌面/com.cnoshome.livecdtools_2.0.0_xxx.deb
```

### 4.2 .tar.gz 校验

```bash
tar -tzf ~/桌面/com.cnoshome.livecdtools_xxx.tar.gz | head -10
```
