// Utilities to export aggregated results to CSV and Excel

export function exportToCSV(filename: string, rows: any[]) {
  const processRow = (row: any) =>
    Object.values(row)
      .map((val) => {
        const inner = String(val ?? "");
        if (inner.search(/[",\n]/g) >= 0) {
          return '"' + inner.replace(/"/g, '""') + '"';
        }
        return inner;
      })
      .join(",");

  const csvContent = [Object.keys(rows[0]).join(","), ...rows.map(processRow)].join("\n");
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportDashboardToPDF(filename: string, containerId: string) {
  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");
  const el = document.getElementById(containerId);
  if (!el) throw new Error("Container not found");

  const canvas = await html2canvas(el, { scale: 2, backgroundColor: getComputedStyle(document.body).backgroundColor });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 40; // margins
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 20;
  let remaining = imgHeight;
  let imgY = position;
  let page = 1;

  // For long dashboards, split into multiple pages vertically
  while (remaining > 0) {
    pdf.addImage(imgData, "PNG", 20, imgY, imgWidth, imgHeight);
    remaining -= pageHeight;
    if (remaining > 0) {
      pdf.addPage();
      imgY = -pageHeight * page + position;
      page++;
    }
  }

  pdf.save(filename);
}

export async function exportToXLSX(filename: string, rows: any[]) {
  const XLSX = await import("xlsx");
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Results");
  XLSX.writeFile(wb, filename);
}

export function flattenAggregatedResults(agg: any[]): any[] {
  // Expecting structure from /api/results for each question
  // [{ questionId, questionText, options: [{ optionId, optionText, total, segmentBreakdown: [{segmentId, segmentName, value}]}]}]
  const rows: any[] = [];
  for (const q of agg) {
    for (const opt of q.options) {
      const base: any = {
        questionId: q.questionId,
        questionText: q.questionText,
        optionId: opt.optionId,
        optionText: opt.optionText,
        total: opt.total,
      };
      // Add segment columns
      for (const seg of opt.segmentBreakdown) {
        base[`seg_${seg.segmentId}_${seg.segmentName}`] = seg.value;
      }
      rows.push(base);
    }
  }
  return rows;
}
