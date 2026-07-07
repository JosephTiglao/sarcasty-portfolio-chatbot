import { read, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadJson(file) {
  return JSON.parse(readFileSync(join(__dirname, "..", "data", file), "utf-8"));
}
