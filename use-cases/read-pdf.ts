import { readFileSync } from "fs";

export class ReadPdf {
  execute(path: string) {
    if (!path) throw new Error("Path cannot be empty");
    const buffer = readFileSync(path);
    return buffer;
  }
}
