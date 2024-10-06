/* eslint-disable @typescript-eslint/no-explicit-any */
import { CB } from "../../electron/render";
import {
  defaultRequestBodyArticle,
  defaultRequestBodyPromotion,
} from "./default";
import JSONWriter from "./JSONWriter";
import { ContentType, Post } from "./Shared/lib";
import Logger from "./Shared/Logger";
import {
  SearchRequest,
  SearchRequestArticle,
  SearchRequestPromotion,
} from "./types";

let logger: Logger | null = null;
let f: CB | null = null;

export function setLoggerCallback(cb: CB): Logger {
  f = cb;
  logger = new Logger(cb);
  return logger;
}

function fireEvent(
  Type:
    | "progress"
    | "count"
    | "complete"
    | "error"
    | "details"
    | "warn"
    | "data",
  message: number | boolean | string | null | object | Array<any>
) {
  if (f) f(Type, message);
}

interface Promoscore_Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: { [key: string]: any[] }[];
}

export async function search_promoscore(
  type: ContentType,
  body?:
    | SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
    | undefined
): Promise<Promoscore_Response> {
  logger?.log("searching _promoscore .....");
  if (!body) {
    body =
      type == "articles"
        ? defaultRequestBodyArticle
        : defaultRequestBodyPromotion;
  }
  const { data } = await Post(body, type);

  return data as Promoscore_Response;
}

let DATA: any[] = [];

export async function start(
  type: ContentType,
  filePath: string,
  body?:
    | SearchRequest<SearchRequestPromotion | SearchRequestArticle>[]
    | undefined
) {
  logger?.log("Start Engine in Main.... ");
  const name = `${type}_${Date.now()}`;
  const Writer = new JSONWriter(filePath, name, logger);

  Writer.writeHeader(JSON.stringify(body ? body[0].params : `${type}`));
  let currentPage = 0;
  let totalPages = 1;

  if (body) {
    body[0].params.hitsPerPage = 10;
  } else {
    logger?.error("Body is Undefined");
  }

  do {
    try {
      logger?.log(`Fetching page ${currentPage}`);
      const { results } = await search_promoscore(type, body);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hits, nbPages } = results[0];
      console.log("Nb Page", nbPages);

      DATA = DATA.concat(hits);
      totalPages = nbPages as unknown as number;
      logger?.log(`Fetching page ${currentPage} Done Out of ${totalPages}`);
      Writer.appendData(DATA);
      // Progress Calculate
      currentPage++;
      const progressPercentage = ((currentPage / totalPages) * 100).toFixed(2);
      fireEvent("progress", progressPercentage);
      if (currentPage == totalPages - 1) fireEvent("complete", "done");
    } catch (e) {
      logger?.error("Got Error in Main Loop");
    }
  } while (currentPage < totalPages);
  Writer.close();
  return {};
}
