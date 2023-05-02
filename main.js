const { app } = require("electron");
const express = require("express");
const server = express();
const bonjourClient = require("bonjour")();
const window = require("./src/window");
const view = require("./src/view");
const port = process.env.PORT || 3030;

function appServer() {
  server.get("/api/ignis", (req, res) => {
    console.log("/ignis path been has called");

    const eventRes = {
      code: "SUCCESS",
      data: {
        name: "The 1975 - Jakarta 2023",
        totalRedeem: 0,
        totalTicket: 1000,
      },
    };

    res.json(eventRes);
  });

  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

function bonjourService() {
  bonjourClient.publish({
    name: "tms-server",
    type: "http",
    port: port,
    host: "ignis",
  });
}

app.whenReady().then(() => {
  appServer();
  bonjourService();

  const mainWindow = window.createBrowserWindow(app);
  view.createBrowserView(mainWindow);

  bonjourClient.find({ type: "http" }, function (service) {
    if (service.name === "tms-server") {
      console.log("Active IP", service.referer.address);
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
