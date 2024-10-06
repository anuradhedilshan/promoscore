/* eslint-disable @typescript-eslint/no-unused-vars */
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  search_promoscore,
  setLoggerCallback,
  start,
} from "../src/engine/Engine.Main.";
import { CB } from "./render";
import { ContentType } from "../src/engine/Shared/lib";
import {
  SearchRequestPromotion,
  SearchRequestArticle,
  Article,
  Promotion,
  SearchRequest,
} from "../src/engine/types";
import ErrorDisplay from "./ErrorDispay";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "./preload.mjs"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.setMenu(null);
  // win.webContents.openDevTools({ mode: 'detach' })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

// Map

const fireEvent: CB = (Type, message) => {
  if (win && !win.isDestroyed()) {
    win.webContents.send("event", { Type, message });
  }
};

ipcMain.handle("openPathDialog", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return result;
});

const logger = setLoggerCallback(fireEvent);

interface LogEntry {
  timestamp: string;
  level: "table";
  message: string;
}

type ProductData = Article | Promotion;

// Helper functions
const formatPrice = (price: number): string => price.toFixed(2);
const calculateDiscount = (discount: number): number =>
  Math.round(discount * 100);

// Main processing function
function processProductData(
  type: ContentType,
  data: ProductData[]
): LogEntry[] {
  const headerLogs: LogEntry[] = [
    {
      timestamp: "",
      level: "table",
      message:
        type === "articles"
          ? "Product | Brand | Category | Packaging | Tendency"
          : "Product | Store | Price | Discount | Price/Unit",
    },
    {
      timestamp: "",
      level: "table",
      message: "-".repeat(60),
    },
  ];

  const processedLogs = data.map((item): LogEntry => {
    if (type === "articles") {
      const article = item as Article;
      return {
        timestamp: "*",
        level: "table",
        message: `${article.name} | ${article.brand} | ${article.category} | ${article.packaging} | ${article.tendency_3m}%`,
      };
    } else {
      const promo = item as Promotion;
      const price = parseFloat(promo.product_price) / 100;
      const discount = calculateDiscount(promo.product_discount);
      const pricePerUnit = parseFloat(promo.product_unit_price) / 100;

      return {
        timestamp: "*",
        level: "table",
        message: `${promo.article_name} | ${promo.retailer} | ${formatPrice(
          price
        )} lei | ${discount}% | ${formatPrice(pricePerUnit)} lei/${
          promo.price_unit
        }`,
      };
    }
  });

  return [...headerLogs, ...processedLogs];
}

ipcMain.handle(
  "search_promoscore",
  async (
    _event,
    type: ContentType,
    searchParams: SearchRequest<SearchRequestArticle | SearchRequestPromotion>[]
  ) => {
    logger.log("Searching");
    const { results } = await search_promoscore(type, searchParams);

    if (!results || results.length === 0) {
      throw new Error("No results found");
    }

    const { facets, nbHits, hits } = results[0];

    if (nbHits) fireEvent("count", nbHits as unknown as string);
    if (hits) fireEvent("data", processProductData(type, hits));

    return facets;
  }
);

ipcMain.handle("show-file-path-error", async () => {
  const result = await dialog.showMessageBox({
    type: "error",
    title: "Configuration Error",
    message: "File Path Not Set",
    detail:
      "Please specify a valid file path in the application settings before proceeding. This is required for proper operation of the application.",
    buttons: ["Cancel"],
    defaultId: 0,
    cancelId: 1,
    noLink: true,
  });

  return result.response;
});

let IS = false;

ipcMain.on(
  "start",
  async (
    _event,
    type: ContentType,
    SearchRequest: SearchRequest<
      SearchRequestPromotion | SearchRequestArticle
    >[],
    location: string
  ) => {
    logger.log("Staring . . . . ");
    console.log(IS);
    try {
      if (!IS) {
        IS = true;
        await start(type, location, SearchRequest);
        IS = false;
        fireEvent("complete", true);
      }
    } catch (error: unknown) {
      console.error(error);
      logger.error(`Data fetching failed : ${error}`);
      ErrorDisplay.showDataFetchError();

      fireEvent("complete", true);
      IS = false;
    }
  }
);
