import { forEach, get, isEmpty, map, set } from "lodash";
import pLimit from "p-limit";
import * as pdfJsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { TextItem } from "pdfjs-dist/types/src/display/api";

interface Coordinate {
  page: number;
  x: number;
  y: number;
}

export class PdfCoordinatesFinder {
  async execute(pdfBuffer: Buffer, tags: Array<string>, concurrency: number = 2) {
    if (isEmpty(tags)) throw new Error("Tags cannot be empty");
    const data = new Uint8Array(pdfBuffer);
    const pdf = await pdfJsLib.getDocument({ data }).promise;

    const results: Record<string, Coordinate[]> = Object.fromEntries(tags.map((tag) => [tag, []]));

    const limit = pLimit(concurrency);

    const pages = Array.from({ length: pdf.numPages });

    const pagesPromises = map(pages, (_, pageIndex) =>
      limit(async () => {
        const page = await pdf.getPage(pageIndex + 1);
        const content = await page.getTextContent();
        const { items } = content || {};
        if (!isEmpty(items)) {
          forEach(items, (item) => {
            forEach(tags, (tag) => {
              if ((item as TextItem).str.includes(tag)) {
                const existing = get(results, tag, []) as Coordinate[];
                existing.push({
                  page: pageIndex + 1,
                  x: (item as TextItem).transform[4],
                  y: (item as TextItem).transform[5],
                });
                set(results, tag, existing);
              }
            });
          });
        }
      }),
    );
    await Promise.all(pagesPromises);
    return results;
  }
}
