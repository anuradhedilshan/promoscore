"use strict";
const { ipcRenderer } = require("electron");
ipcRenderer.on("event", (_e, arg) => {
  console.log("on Event call from preload");
  sendEvent(arg.Type, arg.message);
});
function sendEvent(Type, message) {
  if (window.MyApi.OnEvent) window.MyApi.OnEvent(Type, message);
}
window.MyApi = {
  openFilePicker: async () => {
    const e = await ipcRenderer.invoke("openPathDialog");
    return e.filePaths[0];
  },
  OnEvent: null,
  searchData: (type, body) => {
    return ipcRenderer.invoke("search_promoscore", type, body);
  },
  start: (type, location, SearchRequest2) => {
    ipcRenderer.send("start", type, SearchRequest2, location);
  },
  showFilePathError: () => ipcRenderer.invoke("show-file-path-error")
};
