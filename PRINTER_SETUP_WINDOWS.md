# Windows Printer Setup Guide

## Problem: "No USB printers detected"

If you see this error, it means the USB module loaded correctly but Windows doesn't expose your printer as a USB device. You need to install special USB drivers.

## Solution: Install WinUSB Driver using Zadig

### Step 1: Run Zadig (Included in this app)

1. Navigate to the installation folder: `3rdparty/zadig.exe`
2. **Right-click** `zadig.exe` → **Run as Administrator**

### Step 2: Configure Zadig

1. In Zadig, go to **Options** → Check **"List All Devices"**
2. From the dropdown, select your thermal printer (it might show as "USB Printing Support" or the printer model name)
3. In the driver selection:
   - Target driver (right side): Select **WinUSB** or **libusb-win32**
4. Click **"Replace Driver"** or **"Install Driver"**
5. Wait for installation to complete

### Step 3: Verify Installation

1. Open **Windows Device Manager**
2. Look for your printer under **"Universal Serial Bus devices"** (not "Printers")
3. It should show as a USB device now

### Step 4: Restart the App

1. Close the thermal printer app completely
2. Reopen it
3. Click the printer test button again

The app should now detect your printer! ✅

---

## Finding Your Printer's Vendor ID and Product ID

If you need to find your printer's USB IDs:

1. Open **Device Manager**
2. Find your printer (under USB devices after Zadig installation)
3. Right-click → **Properties** → **Details** tab
4. Select "Hardware Ids" from dropdown
5. Look for: `VID_XXXX&PID_XXXX`
   - VID = Vendor ID (in decimal, convert from hex)
   - PID = Product ID (in decimal, convert from hex)

### Current Printer IDs in the App:

**80mm Printer (VSC TM 801):**
- Vendor ID: 4070 (0x0FE6 in hex)
- Product ID: 33054 (0x811E in hex)

**58mm Printer (C58BT):**
- Vendor ID: 2501 (0x09C5 in hex) 
- Product ID: 22750 (0x58DE in hex)

If your printer has different IDs, you'll need to update the code or contact support.

---

## Troubleshooting

### "Driver installation failed"
- Make sure you're running Zadig **as Administrator**
- Try selecting a different driver (WinUSB vs libusb-win32)
- Disable antivirus temporarily

### "Printer disappeared from Device Manager"
- This is normal - it moved from "Printers" to "USB devices"
- Use Zadig to switch back if needed

### "Still no printers detected"
- Unplug and replug the USB cable
- Try a different USB port
- Restart Windows after driver installation
- Check if printer appears in Device Manager under USB devices

### "Printer works in other apps but not this one"
- Other apps use Windows printing system
- This app needs direct USB access (faster, more control)
- You must use WinUSB/libusb drivers for this app

---

## Why This Is Needed

Normal printer drivers (Windows Print Spooler) don't allow direct USB access. This app uses **escpos** library which needs:
- **Direct USB communication** (faster, no print queue)
- **Raw ESC/POS commands** (barcode, QR codes, cash drawer)
- **libusb drivers** instead of printer drivers

This is why Zadig is required - it replaces the printer driver with a USB driver that allows direct access.

---

## Reverting Changes

If you want to use the printer normally with Windows again:

1. Open **Device Manager**
2. Find printer under "Universal Serial Bus devices"
3. Right-click → **Uninstall device** → Check "Delete driver"
4. Unplug and replug printer
5. Windows will reinstall normal printer drivers

Or use Zadig to switch back to the original driver.

