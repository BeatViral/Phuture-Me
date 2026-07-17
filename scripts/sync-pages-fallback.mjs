import { copyFile, cp, rm } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const pagesOutput = new URL("../pages-dist/", import.meta.url);
const publishedAssets = new URL("../assets/", import.meta.url);

await rm(publishedAssets, { recursive: true, force: true });
await cp(new URL("assets/", pagesOutput), publishedAssets, { recursive: true });
await copyFile(new URL("index.html", pagesOutput), new URL("index.html", projectRoot));
await copyFile(new URL("og.png", pagesOutput), new URL("og.png", projectRoot));
