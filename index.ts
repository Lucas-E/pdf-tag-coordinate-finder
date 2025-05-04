import yargs from "yargs";
import { PdfCoordinatesFinderOrchestrator } from "./domain-services/pdf-coordinates-finder-orhcestrator";
import { PdfCoordinatesFinder } from "./use-cases/pdf-coordinates-finder";
import { ReadPdf } from "./use-cases/read-pdf";

class Main {
  public static async main() {
    try {
      const argv = yargs
        .option("path", {
          type: "string",
          demandOption: true,
          describe: "Caminho do PDF",
        })
        .option("tags", {
          type: "array",
          demandOption: true,
          describe: "Lista de tags a buscar no PDF",
        })
        .parseSync();

      const {path, tags} = argv || {}

      // read pdf instance
      const readPdfUseCase = new ReadPdf();

      // pdf coordinates finder instance
      const pdfCoordinatesFinder = new PdfCoordinatesFinder();

      const orchestrator = new PdfCoordinatesFinderOrchestrator(
        readPdfUseCase,
        pdfCoordinatesFinder,
      );

      const result = await orchestrator.execute(path, (tags as string[]));
      console.log(result)
    } catch (error: any) {
      console.error(error?.message);
    }
  }
}

Main.main().then(() => {
  console.log('FINALIZADO')
});
