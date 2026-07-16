import { copyFile } from "node:fs/promises";

await copyFile(new URL("../pages-dist/index.html", import.meta.url), new URL("../pages-dist/404.html", import.meta.url));

