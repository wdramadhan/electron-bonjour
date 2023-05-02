const path = require("path");
const { BrowserWindow } = require("electron");

exports.createBrowserWindow = () => {
  return new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, "assets/icons/png/64x64.png"),
    backgroundColor: "#fff",
    webPreferences: {
      nativeWindowOpen: true,
      devTools: true,
      contextIsolation: true,
      webviewTag: true,
    },
  });
};
