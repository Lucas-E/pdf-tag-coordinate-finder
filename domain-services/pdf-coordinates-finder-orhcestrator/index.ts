import { isEmpty } from "lodash";
import { PdfCoordinatesFinder } from "../../use-cases/pdf-coordinates-finder";
import { ReadPdf } from "../../use-cases/read-pdf";

export class PdfCoordinatesFinderOrchestrator {
  private readonly readPdfUseCase: ReadPdf;
  private readonly pdfCoordinatesFinderUseCase: PdfCoordinatesFinder;

  constructor(readPdfUseCase: ReadPdf, pdfCoordinatesFinderUseCase: PdfCoordinatesFinder) {
    this.readPdfUseCase = readPdfUseCase;
    this.pdfCoordinatesFinderUseCase = pdfCoordinatesFinderUseCase;
  }

  async execute(path: string, tags: string[]) {
    if (!path || isEmpty(tags)) throw new Error("Invalid data");
    const pdfBuffer = this.readPdfUseCase.execute(path);
    const coordinates = await this.pdfCoordinatesFinderUseCase.execute(pdfBuffer, tags);
    return coordinates;
  }
}
