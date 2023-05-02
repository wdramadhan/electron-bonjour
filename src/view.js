const electron = require("electron");
const { BrowserView } = electron; // https://www.electronjs.org/docs/api/browser-view

exports.createBrowserView = (mainWindow) => {
  const view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 1280, height: 800 });

  mainWindow.on("resize", () => {
    const bounds = mainWindow.getBounds();
    view.setBounds({
      x: 0,
      y: 0,
      width: bounds.width,
      height: bounds.height,
    });
  });

  view.webContents.loadURL("https://gatotkaca.tiket.com/ignis");
};
