const { app, BrowserWindow, Menu, MenuItem } = require("electron");

function createWindow() {
  let win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  /// MENU + IPC
  const menu = createMenu(win);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

const createMenu = (win) => {
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "next",
      accelerator: "k",
      click: () => win.webContents.send("img-next"),
    })
  );
  menu.append(
    new MenuItem({
      label: "prev",
      accelerator: "j",
      click: () => win.webContents.send("img-prev"),
    })
  );
  menu.append(
    new MenuItem({
      label: "Toggle &Developer Tools",
      accelerator: "Shift+Ctrl+I",
      click: () => win.webContents.toggleDevTools(),
    })
  );
  win.setMenuBarVisibility(false)
  return menu;
};
