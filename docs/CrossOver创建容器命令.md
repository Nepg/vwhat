# CrossOver 创建容器命令

适用版本：CrossOver 23

## 一、前置操作

创建容器前清理相关进程，避免占用、端口冲突

```bash
# 终止CrossOver进程
pkill -f cx
# 终止Wine主程序
pkill -f wine
# 终止Wine服务进程
pkill -f wineserver
```

> 提示无进程可直接忽略，继续下一步

## 二、容器（Bottle）创建基础信息

| 项目         | 说明                         |
| ------------ | ---------------------------- |
| 主命令路径   | `/opt/cxoffice/bin/cxbottle` |
| `--bottle`   | 自定义容器名称               |
| `--template` | 指定 Windows 系统模板        |
| 默认存储路径 | `~/.cxoffice/`               |

### 2.1 Win7 64 位容器

```bash
/opt/cxoffice/bin/cxbottle --create --bottle="win7_64bit" --template=win7_64
```

或者
::: details

```bash
env WINEARCH=win64 /opt/cxoffice/bin/cxbottle --create --bottle="win7_64bit" --template=win7_64
```

:::

### 2.2 Win7 32 位容器

```bash
/opt/cxoffice/bin/cxbottle --create --bottle="win7_32bit" --template=win7
```

### 2.3 Win10 64 位容器

```bash
/opt/cxoffice/bin/cxbottle --create --bottle="win10_64bit" --template=win10_64
```

或者
::: details

```bash
env WINEARCH=win64 /opt/cxoffice/bin/cxbottle --create --bottle="win10_64bit" --template=win10_64
```

:::

### 2.4 Win10 32 位容器

```bash
/opt/cxoffice/bin/cxbottle --create --bottle="win10_32bit" --template=win10
```

## 三、容器创建校验

### 方式 1：目录查看

```bash
ls -la ~/.cxoffice/
```

输出包含目标容器文件夹即创建成功。

### 方式 2：命令列表查询

```bash
/opt/cxoffice/bin/cxbottle --list
```

## 四、容器内运行 Windows 程序

### 通用语法

```bash
/opt/cxoffice/bin/wine --bottle="容器名" "程序路径"
```

### 示例 1：运行安装包

```bash
/opt/cxoffice/bin/wine --bottle="win7_64bit" "/home/what/桌面/WeCom_5.0.9.6063.exe"
```

### 示例 2：运行已安装软件

```bash
/opt/cxoffice/bin/wine --bottle="win10_64bit" "C:\Program Files\WXWork\WXWork.exe"
```

### 路径映射说明

容器内 `C:\` 对应宿主路径：`~/.cxoffice/容器名/drive_c/`

例：`C:\Program Files` → `~/.cxoffice/win7_64bit/drive_c/Program\ Files/`

## 五、删除容器

### 语法

```bash
rm -rf ~/.cxoffice/容器名
```

### 示例

```bash
rm -rf ~/.cxoffice/win7_64bit
```

> 操作不可逆，会清除容器内全部程序、配置、用户数据；重要文件提前备份 `~/.cxoffice/容器名/drive_c/users/`
