# Thermal Printer Application

Desktop application for thermal receipt printing via USB with direct ESC/POS commands.

## ⚠️ Windows Setup Required

**IMPORTANT:** Before using the app on Windows, you must install USB drivers:

1. Run `3rdparty/zadig.exe` as Administrator
2. Follow instructions in `PRINTER_SETUP_WINDOWS.md`

This converts your printer from a Windows "Printer Device" to a "USB Device" for direct access.

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

## Building

See `BUILD_WINDOWS.md` for instructions on building for Windows with USB support.

```bash
npm run build
npx electron-builder build --win --x64 --publish never
```

## Features

- Thermal receipt printing via direct USB
- 58mm and 80mm paper formats
- Barcode and QR code printing
- Text formatting
- Cash drawer control
- Fast printing (no Windows print queue)
