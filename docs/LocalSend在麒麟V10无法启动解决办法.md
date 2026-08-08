# LocalSend在麒麟V10系统无法启动解决办法

适用场景：安装 LocalSend-1.17.0-linux-x86-64.deb 后，桌面图标点击无反应，或双击后没有任何窗口弹出。

## 一、问题现象

1. 通过软件包管理器或 `sudo dpkg -i` 安装 deb 包成功；
2. 点击「开始菜单」或桌面快捷方式，程序无任何响应；
3. 多次点击仍然无法打开，系统无明显错误提示。

## 二、诊断方法（通过终端获取错误日志）

1. 打开终端

   桌面空白处右键 →「打开终端」，或快捷键 `Ctrl+Alt+T`

2. 查找 LocalSend 可执行文件路径

```bash
find /usr -name "*localsend*" -executable -type f 2>/dev/null
```

正常输出示例：

```text
/usr/share/localsend_app/localsend_app
```

3. 终端直接运行程序查看报错

```bash
/usr/share/localsend_app/localsend_app
```

典型报错示例（缺少托盘依赖库）：

```text
error while loading shared libraries: libayatana-appindicator3.so.1: cannot open shared object file: No such file or directory
```

## 三、解决方案（缺失托盘库问题）

1. 更新软件源并安装缺失依赖

```bash
sudo apt update
sudo apt install libayatana-appindicator3-1
```

若提示找不到该包，安装替代包：

```bash
sudo apt install libappindicator3-1
```

2. 终端重新启动程序验证

```bash
/usr/share/localsend_app/localsend_app
```

正常弹出 LocalSend 主窗口即修复完成。

3. 验证桌面快捷方式

   关闭终端，双击桌面图标 / 开始菜单内 LocalSend，确认正常启动。

## 四、其他常见问题及备用方案

### ① 报错 `GLIBC_2.29 not found` / GLIBCXX 版本过低

原因：银河麒麟 V10 基于 Ubuntu 18.04，系统 glibc 版本不足

解决：放弃 deb 包，使用自带依赖的 AppImage 便携版

1. 下载 `LocalSend-1.17.0-linux-x86-64.AppImage`
2. 赋予执行权限

```bash
chmod +x LocalSend-*.AppImage
```

3. 双击运行或终端启动

```bash
./LocalSend-*.AppImage
```

### ② XCB 图形依赖缺失（`libxcb-xinerama.so.0` 类报错）

1. 批量安装 Qt XCB 依赖库

```bash
sudo apt install libxcb-xinerama0 libxcb-icccm4 libxcb-image0 libxcb-keysyms1 libxcb-randr0 libxcb-render-util0 libxcb-shape0 libxcb-xfixes0
```

2. 指定图形平台启动

```bash
QT_QPA_PLATFORM=xcb /usr/share/localsend_app/localsend_app
```

### ③ 程序闪退、进程残留无窗口

结束残留进程后重新启动：

```bash
pkill -f localsend
/usr/share/localsend_app/localsend_app
```

### ④ 终极兼容方案：Flatpak 沙盒运行

```bash
# 安装 flatpak
sudo apt install flatpak
# 安装 LocalSend
flatpak install flathub org.localsend.localsend_app
# 运行程序
flatpak run org.localsend.localsend_app
```

## 五、启动后优化建议

### 1. 高分屏界面缩放适配

临时缩放启动（示例缩放 1.5 倍）：

```bash
QT_SCALE_FACTOR=1.5 /usr/share/localsend_app/localsend_app
```

永久生效：修改快捷方式文件 `/usr/share/applications/localsend_app.desktop` 的 `Exec` 行。

### 2. 系统托盘图标不显示

使用 XCB 平台变量启动：

```bash
QT_QPA_PLATFORM=xcb /usr/share/localsend_app/localsend_app
```

## 六、总结

故障核心原因：系统缺少 `libayatana-appindicator3` 托盘依赖库，安装对应库即可解决。

若在麒麟等国产 Linux 系统遇到点击图标无响应问题，**优先终端运行程序抓取报错**，再按需安装依赖，不要重复点击图标重试。
