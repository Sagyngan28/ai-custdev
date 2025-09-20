"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AppHeader } from "@/components/AppHeader";
import { surveyTemplates, type SurveyTemplate } from "@/data/survey-templates";
import { ArrowLeft, Sparkles, Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface QuestionInput {
  text: string;
  options: string[];
}

export default function CreateSurveyPage() {
  const [niche, setNiche] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionInput[]>([
    { text: "", options: ["Вариант 1", "Вариант 2", "Вариант 3"] },
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [showTemplates, setShowTemplates] = useState(true);
  const router = useRouter();

  const addQuestion = () => setQuestions((qs) => [...qs, { text: "", options: ["Вариант 1", "Вариант 2"] }]);
  const removeQuestion = (qIdx: number) => setQuestions((qs) => qs.filter((_, i) => i !== qIdx));
  const updateQuestionText = (qIdx: number, value: string) =>
    setQuestions((qs) => qs.map((q, i) => (i === qIdx ? { ...q, text: value } : q)));
  const addOption = (qIdx: number) =>
    setQuestions((qs) => qs.map((q, i) => (i === qIdx ? { ...q, options: [...q.options, "Новый вариант"] } : q)));
  const updateOption = (qIdx: number, optIdx: number, value: string) =>
    setQuestions((qs) =>
      qs.map((q, i) => (i === qIdx ? { ...q, options: q.options.map((o, j) => (j === optIdx ? value : o)) } : q))
    );
  const removeOption = (qIdx: number, optIdx: number) =>
    setQuestions((qs) =>
      qs.map((q, i) => (i === qIdx ? { ...q, options: q.options.filter((_, j) => j !== optIdx) } : q))
    );

  const useTemplate = (template: SurveyTemplate) => {
    setNiche(template.niche);
    setTitle(template.title);
    setQuestions(template.questions);
    setShowTemplates(false);
    toast.success(`Шаблон "${template.title}" загружен!`);
  };

  const startFromScratch = () => {
    setShowTemplates(false);
  };

  const submit = async () => {
    setLoading(true);
    try {
      // 1) Create survey
      setLoadingStep("Создание опроса...");
      const surveyRes = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche,
          title,
          surveyQuestions: questions.map((q) => ({
            text: q.text,
            type: "multiple-choice",
            options: q.options.filter(Boolean),
          })),
        }),
      });
      const surveyJson = await surveyRes.json();
      if (!surveyRes.ok || !surveyJson.surveyId) throw new Error("Create survey failed");

      const surveyId = surveyJson.surveyId;

      // 2) Generate segments using GLM
      setLoadingStep("Генерация сегментов аудитории с помощью GLM-4.5-Flash...");
      await fetch("/api/segments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId, niche }),
      });

      // 3) Generate responses using GLM
      setLoadingStep("Симуляция ответов респондентов...");
      await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId }),
      });

      // 4) Navigate to dashboard
      setLoadingStep("Подготовка дэшборда...");
      toast.success("Опрос создан, переходим к дэшборду...");
      router.push(`/dashboard/${surveyId}`);
    } catch (e) {
      console.error(e);
      toast.error("Ошибка при создании опроса");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  if (loading) {
    return (
      <>
        <AppHeader title="Создание опроса" />
        <main className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner message={loadingStep} glmMode={loadingStep.includes("GLM")} />
        </main>
      </>
    );
  }

  if (showTemplates) {
    return (
      <>
        <AppHeader title="Создание опроса" />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-4"
            >
              Выберите шаблон или создайте с нуля
            </motion.h1>
            <p className="text-muted-foreground text-lg">
              Готовые шаблоны помогут быстрее начать исследование
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {surveyTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => useTemplate(template)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{template.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {template.niche}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {template.description}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      {template.questions.length} вопросов
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={startFromScratch}
                className="group"
              >
                <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                Создать с нуля
              </Button>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader title="Создание опроса" />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Создание опроса</h1>
            <p className="text-muted-foreground">Настройте ваш опрос для анализа аудитории</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Шаблоны
          </Button>
        </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Ниша</label>
        <input
          className="w-full rounded-md border bg-background p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Например: EdTech, FinTech, Ecommerce"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Укажите вашу бизнес-нишу для более точной генерации сегментов
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Название опроса</label>
        <input
          className="w-full rounded-md border bg-background p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Цель/контекст опроса"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Опишите цель вашего исследования
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Вопросы</label>
          <Button type="button" variant="outline" onClick={addQuestion}>
            + Добавить вопрос
          </Button>
        </div>
        
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="rounded-lg border p-6 bg-card">
            <div className="mb-4 flex items-center gap-2">
              <input
                className="w-full rounded-md border bg-background p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={`Вопрос #${qIdx + 1}`}
                value={q.text}
                onChange={(e) => updateQuestionText(qIdx, e.target.value)}
              />
              {questions.length > 1 && (
                <Button variant="outline" type="button" onClick={() => removeQuestion(qIdx)}>
                  Удалить
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Варианты ответов:</label>
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <input
                    className="w-full rounded-md border bg-background p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={opt}
                    onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                  />
                  {q.options.length > 1 && (
                    <Button variant="outline" size="sm" type="button" onClick={() => removeOption(qIdx, optIdx)}>
                      –
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button type="button" variant="secondary" size="sm" onClick={() => addOption(qIdx)}>
                + Добавить вариант
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t">
        <Button 
          disabled={loading || !niche.trim() || !title.trim() || questions.some(q => !q.text.trim())} 
          onClick={submit} 
          className="w-full"
          size="lg"
        >
          {loading ? "Создание..." : "Сгенерировать аудиторию"}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Процесс займет 10-30 секунд в зависимости от сложности опроса
        </p>
      </div>
      </main>
    </>
  );
}
