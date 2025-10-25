/* eslint global-require: off, no-console: off, promise/always-return: off */
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import path from 'path';

import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;


ipcMain.on('ipc-escpos-printer-80', async (event) => {
  console.log('IPC ESCPOS STARTING 80mm --------');

  try {               
    const escpos = require('escpos');   // import lib escpos            
    escpos.USB = require('escpos-usb'); // create usb adapter          
    
    const printers = escpos.USB.findPrinter();
    console.log('Available printers:', printers); // for see printer spesification (idVendor & idProduct)
    
    if (!printers || printers.length === 0) {
      event.reply('printer-response', {
        success: false,
        error: 'No USB printers found. Please check:\n1. Printer is connected via USB\n2. Printer is powered on\n3. USB drivers are installed'
      });
      return;
    }
                  
    // register idVendor & idProduct Printer    
    const device = new escpos.USB(4070, 33054); // Printer VSC TM 801    
    const printer = new escpos.Printer(device); // initialize printer       
    
    let qrUrl = 'https://github.com/denitiawan';
  
    // templating
    device.open((openError: any) => {
      if (openError) {
        event.reply('printer-response', {
          success: false,
          error: `Failed to open printer connection:\n${openError.message || openError}\n\nPlease check:\n1. Printer vendor ID: 4070, product ID: 33054\n2. Printer drivers are installed\n3. Printer is not in use by another application`
        });
        return;
      }
        
      // print text
      printer.align('lt').text('');
      printer.align('ct').text('Test Printing');
      printer.align('ct').text('Thermal Printer App');
      printer.align('lt').text('');

      printer.align('ct').text('Feature Support : ');
      printer.align('ct').text('Printout Text');
      printer.align('ct').text('Printout Barcode (CODE39)');
      printer.align('ct').text('Printout QR Code');
      printer.align('ct').text('Cut Paper');
      printer.align('ct').text('Open Cash Drawer');                
      printer.align('lt').text('');        
      
      // Print Barcode  
      printer.align('ct').barcode('CODE39', 'CODE39'); 
      printer.align('ct').text('');
             
      // Print QR Code
      printer.align('ct').text('Scan Me').style('B');
      printer.align("ct").qrimage(qrUrl, function (qrError: any) {
        if (qrError) {
          console.error('QR Code error:', qrError);
        }
        printer.align('ct').text(qrUrl);  
        printer.align('ct').text(new Date().toLocaleString());
        printer.align('ct').text('');
        printer.align('ct').text('');
      
        // print action
        printer.cut(); 
        printer.cashdraw(2); 
        printer.close(() => {
          event.reply('printer-response', {
            success: true,
            message: 'Print job completed successfully for 80mm printer!'
          });
        });
      });
    });   

  } catch (error: any) {    
    console.error('Printer error:', error);
    event.reply('printer-response', {
      success: false,
      error: `Unexpected error:\n${error.message || error}\n\nStack trace:\n${error.stack || 'No stack trace available'}`
    });
  }    
});

ipcMain.on('ipc-escpos-printer-58', async (event) => {
  console.log('IPC ESCPOS STARTING 58mm --------');

  try {               
    const escpos = require('escpos');   // import lib escpos            
    escpos.USB = require('escpos-usb'); // create usb adapter          
    
    const printers = escpos.USB.findPrinter();
    console.log('Available printers:', printers); // for see printer spesification (idVendor & idProduct)
    
    if (!printers || printers.length === 0) {
      event.reply('printer-response', {
        success: false,
        error: 'No USB printers found. Please check:\n1. Printer is connected via USB\n2. Printer is powered on\n3. USB drivers are installed'
      });
      return;
    }
                  
    // register idVendor & idProduct Printer    
    const device = new escpos.USB(2501,22750); // Printer C58BT
    const printer = new escpos.Printer(device); // initialize printer       
    
    let qrUrl = 'https://github.com/denitiawan';
  
    // templating
    device.open((openError: any) => {
      if (openError) {
        event.reply('printer-response', {
          success: false,
          error: `Failed to open printer connection:\n${openError.message || openError}\n\nPlease check:\n1. Printer vendor ID: 2501, product ID: 22750\n2. Printer drivers are installed\n3. Printer is not in use by another application`
        });
        return;
      }
        
      // print text
      printer.align('lt').text('');
      printer.align('ct').text('Test Printing');
      printer.align('ct').text('Thermal Printer App');
      printer.align('lt').text('');

      printer.align('ct').text('Feature Support : ');
      printer.align('ct').text('Printout Text');
      printer.align('ct').text('Printout Barcode (CODE39)');
      printer.align('ct').text('Printout QR Code');
      printer.align('ct').text('Cut Paper');
      printer.align('ct').text('Open Cash Drawer');                
      printer.align('lt').text('');        
      
      // Print Barcode  
      printer.align('ct').barcode('CODE39', 'CODE39'); 
      printer.align('ct').text('');
             
      // Print QR Code
      printer.align('ct').text('Scan Me').style('B');
      printer.align("ct").qrimage(qrUrl, function (qrError: any) {
        if (qrError) {
          console.error('QR Code error:', qrError);
        }
        printer.align('ct').text(qrUrl);  
        printer.align('ct').text(new Date().toLocaleString());
        printer.align('ct').text('');
        printer.align('ct').text('');
      
        // print action
        printer.cut(); 
        printer.cashdraw(2); 
        printer.close(() => {
          event.reply('printer-response', {
            success: true,
            message: 'Print job completed successfully for 58mm printer!'
          });
        });
      });
    });   

  } catch (error: any) {    
    console.error('Printer error:', error);
    event.reply('printer-response', {
      success: false,
      error: `Unexpected error:\n${error.message || error}\n\nStack trace:\n${error.stack || 'No stack trace available'}`
    });
  }    
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
