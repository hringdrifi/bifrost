import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const input = await FileBlob.load("../../BOM.xlsx");
const workbook = await SpreadsheetFile.importXlsx(input);
const source = workbook.worksheets.getItem("Sheet1");
const existing = workbook.worksheets.items.find((s) => s.name === "集計");
if (existing) workbook.worksheets.remove(existing);
const sheet = workbook.worksheets.add("集計");

const boardColumns = [
  { name: "left", startCol: 0 },
  { name: "right", startCol: 6 },
  { name: "leftthumb", startCol: 12 },
  { name: "rightthumb", startCol: 18 },
  { name: "righttrackball", startCol: 24 },
];
const sourceValues = source.getRange("A1:AC33").values;
const parts = new Map();
const norm = (value) => String(value ?? "").trim();

for (const board of boardColumns) {
  for (let row = 2; row < sourceValues.length; row++) {
    const values = sourceValues[row];
    const designator = norm(values[board.startCol]);
    const footprint = norm(values[board.startCol + 1]);
    const quantity = Number(values[board.startCol + 2] ?? 0);
    const value = norm(values[board.startCol + 3]);
    const lcsc = norm(values[board.startCol + 4]);
    if (!designator || !quantity) continue;
    const key = lcsc ? `LCSC:${lcsc}` : `SPEC:${footprint}|${value}`;
    if (!parts.has(key)) {
      parts.set(key, { lcsc, value, footprint, designators: [], quantities: Object.fromEntries(boardColumns.map(({ name }) => [name, 0])) });
    }
    const part = parts.get(key);
    if (!part.footprint && footprint) part.footprint = footprint;
    if (!part.value && value) part.value = value;
    part.quantities[board.name] += quantity;
    part.designators.push(`${board.name}: ${designator}`);
  }
}

const rows = [...parts.values()]
  .sort((a, b) => (a.lcsc || a.value).localeCompare(b.lcsc || b.value, "en"))
  .map((part, index) => [
    part.lcsc || "（LCSC番号なし）",
    part.value,
    part.footprint,
    ...boardColumns.map(({ name }) => part.quantities[name] || 0),
    null,
    part.designators.join(" / "),
  ]);

sheet.getRange("A1:J1").merge();
sheet.getRange("A1").values = [["必要部品集計（5基板分）"]];
sheet.getRange("A2:J2").merge();
sheet.getRange("A2").values = [["同一のLCSC部品番号を統合。LCSC番号がない部品はフットプリントと値で区別しています。"]];
sheet.getRange("A4:J4").values = [["LCSC Part #", "Value", "Footprint", "left", "right", "leftthumb", "rightthumb", "righttrackball", "合計", "設計番号（基板別）"]];
if (rows.length) {
  sheet.getRange(`A5:J${rows.length + 4}`).values = rows;
  sheet.getRange("I5").formulas = [["=SUM(D5:H5)"]];
  sheet.getRange(`I5:I${rows.length + 4}`).fillDown();
}

sheet.getRange("A1:J1").format = {
  fill: "#1F4E78",
  font: { bold: true, color: "#FFFFFF", size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
sheet.getRange("A2:J2").format = { font: { italic: true, color: "#595959" }, fill: "#D9EAF7" };
sheet.getRange("A4:J4").format = {
  fill: "#5B9BD5",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
sheet.getRange(`A4:J${rows.length + 4}`).format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
sheet.getRange(`D5:I${rows.length + 4}`).format.numberFormat = "#,##0";
sheet.getRange(`D5:I${rows.length + 4}`).format.horizontalAlignment = "right";
sheet.getRange(`A5:C${rows.length + 4}`).format.verticalAlignment = "center";
sheet.getRange(`J5:J${rows.length + 4}`).format.wrapText = true;
sheet.getRange(`I5:I${rows.length + 4}`).format = { fill: "#E2F0D9", font: { bold: true }, numberFormat: "#,##0", horizontalAlignment: "right" };
sheet.getRange("A1:J1").format.rowHeight = 28;
sheet.getRange("A2:J2").format.rowHeight = 22;
sheet.getRange("A4:J4").format.rowHeight = 30;
sheet.getRange(`A4:J${rows.length + 4}`).format.autofitColumns();
sheet.getRange("A:A").format.columnWidth = 18;
sheet.getRange("B:B").format.columnWidth = 24;
sheet.getRange("C:C").format.columnWidth = 34;
sheet.getRange("D:I").format.columnWidth = 14;
sheet.getRange("J:J").format.columnWidth = 55;
sheet.freezePanes.freezeRows(4);
sheet.showGridLines = false;
sheet.tables.add(`A4:J${rows.length + 4}`, true, "AggregatedBOM");

const verification = await workbook.inspect({ kind: "table", range: `集計!A1:J${rows.length + 4}`, include: "values,formulas", tableMaxRows: 100, tableMaxCols: 10 });
console.log(verification.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "formula error scan" });
console.log(errors.ndjson);
const preview = await workbook.render({ sheetName: "集計", autoCrop: "all", scale: 1.5, format: "png" });
await fs.writeFile("./aggregate-preview.png", new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save("./BOM_集計.xlsx");
