// news-image-01 entry (Node 22, standard library only).
// The art is the entry.png beside this file: a one-page newspaper front page summing up
// Friday 13 November 2026's world news — Ukraine peace talks (hero), Nvidia's chief resigning,
// the Microsoft Outlook/Teams outage, the strike on Gaza's Nasser Hospital, and the LNG tanker
// mine in the Strait of Hormuz. The program copies it to the grader's output directory
// ($MAKEFUN_OUTPUT_DIR, else /output/entry.png), deterministic, no network.
// It first checks the file really is a whole PNG or JPEG (by magic bytes) and within the
// 1 MiB gate, so a bad image fails loudly here instead of reaching the judge as garbage.
// Run locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const bytes = readFileSync(join(here, "entry.png"));
const isPng = bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
const isJpeg = bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
if (!isPng && !isJpeg) {
  throw new Error("entry.png is neither a PNG nor a JPEG (bad magic bytes)");
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB gate`);
}
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
writeFileSync(target, bytes);
console.log(`wrote ${bytes.length} bytes (${isPng ? "PNG" : "JPEG"}) to ${target}`);
