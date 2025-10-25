# Building for Windows with USB/Thermal Printer Support

The USB module requires native compilation for Windows. Here are your options:

## Option 1: Build on a Windows Machine (RECOMMENDED ✅)

This is the most reliable method and will ensure the USB/thermal printer functionality works correctly.

### Steps:

1. **Transfer your project to a Windows machine**
   - Copy the entire project folder, or
   - Push to GitHub and clone on Windows

2. **Install Node.js on Windows**
   - Download from: https://nodejs.org/
   - Recommended: Node.js 18 LTS

3. **Install Windows Build Tools**
   ```cmd
   npm install --global windows-build-tools
   ```
   Or install Visual Studio Build Tools manually from:
   https://visualstudio.microsoft.com/downloads/

4. **Build the project**
   ```cmd
   cd path\to\electron-react-boilerplate-escpos
   npm install
   npm run build
   npx electron-builder build --win --x64 --publish never
   ```

5. **Find your installer**
   - Located at: `release\build\ElectronReact Setup 0.0.1.exe`
   - This installer will have proper USB support!

---

## Option 2: Use GitHub Actions (Automated Cloud Build)

I've created a GitHub Actions workflow file at `.github/workflows/build-windows.yml`

### Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Windows build workflow"
   git push
   ```

2. **The build will automatically run**
   - Go to your GitHub repository
   - Click "Actions" tab
   - Wait for the build to complete
   - Download the `windows-installer` artifact

3. **Manual trigger**
   - Go to Actions → Build Windows
   - Click "Run workflow"
   - Download the artifact when done

---

## Option 3: Use a Windows Virtual Machine

If you don't have a physical Windows machine:

1. **Set up Windows VM** (choose one):
   - **Parallels Desktop** (Mac, paid)
   - **VMware Fusion** (Mac, has free version)
   - **VirtualBox** (Free, all platforms)
   - **UTM** (Free, Mac with Apple Silicon)

2. **Get Windows**
   - Download Windows 11 dev VM: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/
   - Or use Windows 10/11 evaluation

3. **Follow Option 1 steps inside the VM**

---

## Why This Is Necessary

The `usb` module (version 1.9.2) in your project uses native code that must be compiled specifically for each operating system:

- **Native modules** = C/C++ code that interfaces directly with the OS
- **USB hardware access** requires platform-specific drivers and compilation
- **Cross-compilation** from macOS → Windows for native modules is very difficult without Docker/proper toolchains

When you build on macOS, the USB module gets compiled for macOS (or skipped), which won't work on Windows.

---

## Quick Reference

**Current Project Status:**
- ✅ JavaScript/TypeScript code compiles fine
- ✅ React UI works cross-platform
- ✅ Electron packaging works
- ❌ USB module needs Windows compilation for Windows builds

**Dependencies requiring native compilation:**
- `usb@1.9.2` (in release/app/package.json)
- `escpos-usb@3.0.0-alpha.4`

---

## Need Help?

If you're having trouble with any of these methods, let me know which option you'd like to pursue and I can provide more detailed guidance!

