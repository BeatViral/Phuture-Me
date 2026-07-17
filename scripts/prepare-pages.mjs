import { copyFile, rm } from "node:fs/promises";

const generatedEntry = new URL("../pages-dist/pages-entry.html", import.meta.url);
const index = new URL("../pages-dist/index.html", import.meta.url);

await copyFile(generatedEntry, index);
await copyFile(generatedEntry, new URL("../pages-dist/404.html", import.meta.url));
await rm(generatedEntry);
