# Thermal Printer Application

Desktop application for thermal receipt printing via USB.

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

- Thermal receipt printing
- USB printer support
- 58mm and 80mm paper formats
- Barcode and QR code printing
- Text formatting
