// import Proxy from "../src/engine/proxy/Proxy";

import { SearchRequest } from "../src/engine/Engine.Main.";
import { ContentType } from "../src/engine/Shared/lib";

export interface IElectronAPI {
  searchData: (
    type: ContentType,
    SearchRequest?:
      | SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
      | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
  OnEvent: CB | null;
  start: (
    type: ContentType,
    location: string,
    SearchRequest?:
      | SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
      | undefined
  ) => void;
  showFilePathError: () => Promise<unknown>;
  openFilePicker: () => Promise<unknown>;
}

declare global {
  interface Window {
    MyApi: IElectronAPI;
    BuildID: string | null;
  }
  type OBJ = {
    estate: string;
    transaction: string;
    city: string;
    distanceRadius: number;
  };
}

type LogLevel = "info" | "error" | "warn" | "table";
export type CB = (
  Type:
    | "progress"
    | "count"
    | "complete"
    | "error"
    | "details"
    | "warn"
    | "data",
  message: number | boolean | string | null | object | Array<any>
) => void;
