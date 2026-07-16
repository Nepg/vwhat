# HumanitZ Headless Server – Item Stack Mod Customization Guide

## 1. Tool Preparation

Download the two tools below and place them in the `Customization` folder (same level as `build.bat` and `blacklist.txt`):

- **UAssetGUI (UE4 Asset Editor)** Download: [Releases · atenfyr/UAssetGUI · GitHub](https://link.wtturl.cn/?target=https%3A%2F%2Fgithub.com%2Fatenfyr%2FUAssetGUI&scene=im&aid=497858&lang=zh) File: `UAssetGUI.exe`
- **repak (PAK Packing Tool)** Download: [Releases · trumank/repak · GitHub](https://link.wtturl.cn/?target=https%3A%2F%2Fgithub.com%2Ftrumank%2Frepak&scene=im&aid=497858&lang=zh) File: `repak.exe`

Folder structure example:

```
Customization/
├── build.bat
├── blacklist.txt
├── UAssetGUI.exe
├── repak.exe
└── ...
```

## 2. Configure Item Blacklist

Items added to the blacklist will have a stack limit of **1** (non-stackable). All other items will have a stack limit of **999**.

Edit `blacklist.txt` following these rules:

- One item ID per line (e.g. `Apple`). If you are unsure about item IDs, consider installing HumanitZ Compendium – it lists over 700 item IDs for reference.
- Lines starting with `#` are treated as comments and ignored.

Save the file after editing.

## 3. Modify Database Asset with UAssetGUI

1. Launch `UAssetGUI.exe`, then select **UE4.27** from the engine version dropdown in the top-right corner.
2. Open the database file: `File` → `Open` → Select `Customization\ZzzHlSvrStack_p\HumanitZServer\Content\TSS_Game\Data\Localization\DT_ItemDatabase.uasset`
3. Enable script permissions: `Edit` → `Settings` → Check **Allow untrusted scripts**, then close the settings window.
4. Create a new script: `Utils` → `Edit scripts` → `Add new script` to create a blank script.
5. Paste all code from `modify_stack.cs` inside the Customization folder into the script editor, then save the script.
6. Run the script: `Utils` → `Execute script` → Select the script you just created and run it.
7. A pop-up window will show the total number of modified items once execution finishes. Click `OK` to confirm.
8. Save the asset: `File` → `Save`, then close UAssetGUI.

## 4. Pack Server Mod File

Confirm `repak.exe` exists inside the Customization folder, then double-click `build.bat` to start packing.
After packing completes, `ZzzHlSvrStack_p.pak` will be generated. This is the mod file to load on your server.
