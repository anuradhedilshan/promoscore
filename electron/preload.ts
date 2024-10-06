// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

type ContentType = "articles" | "promotions";

import {
  SearchRequestPromotion,
  SearchRequestArticle,
  SearchRequest,
} from "../src/engine/types";

ipcRenderer.on("event", (_e, arg) => {
  console.log("on Event call from preload");

  sendEvent(arg.Type, arg.message);
});

function sendEvent(
  Type: "progress" | "count" | "complete" | "error" | "details" | "warn",
  message: number | boolean | string | null
) {
  if (window.MyApi.OnEvent) window.MyApi.OnEvent(Type, message);
}

window.MyApi = {
  openFilePicker: async () => {
    const e =  await ipcRenderer.invoke("openPathDialog");
    return e.filePaths[0]
  },
  OnEvent: null,
  searchData: (
    type: ContentType,
    body?:
      | SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
      | undefined
  ) => {
    return ipcRenderer.invoke("search_promoscore", type, body);
  },
  start: (
    type: ContentType,
    location: string,
    SearchRequest?:
      | SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
  ) => {
    ipcRenderer.send("start", type, SearchRequest, location);
  },
  showFilePathError: () => ipcRenderer.invoke("show-file-path-error"),
};
