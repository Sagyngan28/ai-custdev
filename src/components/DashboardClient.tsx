"use client";

import { SegmentList } from "@/components/SegmentList";
import { ChartPie } from "@/components/ChartPie";
import { ChartBar } from "@/components/ChartBar";
import { RadarCompare } from "@/components/RadarCompare";
import { Insights } from "@/components/Insights";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { exportToCSV, exportToXLSX, flattenAggregatedResults } from "@/lib/export";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DashboardClient({ data }: { data: any }) {
  const survey = data.survey;
  const segments = data.segments;
  const results = data.results || [];
  const [selectedSegments, setSelectedSegments] = useState<number[]>([]);

  const firstQuestion = results?.[0];
  const pieData = firstQuestion ? firstQuestion.options.map((o: any) => ({ name: o.optionText, value: o.total })) : [];
  const barData = segments.map((s: any) => ({ name: s.name, weight: s.percentage }));

  const handleSegmentToggle = (segmentId: number) => {
    setSelectedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Ссылка скопирована");
    } catch {
      toast.error("Не удалось скопировать ссылку");
    }
  };

  const handleExportCSV = () => {
    const rows = flattenAggregatedResults(results);
    if (rows.length === 0) return toast.error("Нет данных для экспорта");
    exportToCSV(`results_survey_${survey.id}.csv`, rows);
    toast.success("CSV экспортирован");
  };

  const handleExportXLSX = async () => {
    const rows = flattenAggregatedResults(results);
    if (rows.length === 0) return toast.error("Нет данных для экспорта");
    await exportToXLSX(`results_survey_${survey.id}.xlsx`, rows);
    toast.success("Excel экспортирован");
  };

  return (
    <>
      <AppHeader title={`Дашборд: ${survey.title}`} />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{survey.title}</h1>
              <p className="text-muted-foreground">Ниша: {survey.niche}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopyLink}>
                Поделиться
              </Button>
              <Button variant="outline" onClick={handleExportCSV}>
                CSV
              </Button>
              <Button variant="outline" onClick={handleExportXLSX}>
                Excel
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Распределение ответов</h3>
            <ChartPie data={pieData} />
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Вес сегментов</h3>
            <ChartBar data={barData} dataKey="weight" labelKey="name" />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-medium">Сегменты</h3>
          <SegmentList 
            segments={segments} 
            selected={selectedSegments}
            onToggle={handleSegmentToggle}
          />
        </section>

        {selectedSegments.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-medium">Сравнение сегментов</h3>
            <div className="rounded-lg border p-4">
              <RadarCompare 
                segments={segments}
                questions={results}
                selectedSegmentIds={selectedSegments}
              />
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h3 className="font-medium">Инсайты</h3>
          <Insights items={data.insights || []} />
        </section>
      </main>
    </>
  );
}
