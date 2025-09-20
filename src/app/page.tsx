"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const data = [
  { name: "Студенты", value: 40 },
  { name: "Специалисты", value: 35 },
  { name: "Родители", value: 25 },
];

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleCreateSurvey = () => {
    router.push("/create");
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setEmail("");
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-indigo-50 via-white to-white text-gray-900 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 dark:text-gray-100">
      {/* Hero */}
      <section className="text-center py-24 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600"
        >
          AI CustDev Simulator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Симулируйте аудиторию вместо реальных интервью. Создайте опрос и
          получите сегменты и инсайты от 20M виртуальной аудитории.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            onClick={handleCreateSurvey}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform"
          >
            Создать опрос
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Почему именно мы?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Сегменты за секунды",
              desc: "ИИ автоматически делит 100% населения на релевантные группы.",
            },
            {
              title: "Реалистичные ответы",
              desc: "Каждый сегмент отвечает как настоящие пользователи.",
            },
            {
              title: "Инсайты и экспорт",
              desc: "PDF/Excel отчёты и рекомендации для бизнеса.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo Visualization */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8"
        >
          Пример анализа аудитории
        </motion.h2>
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-80 h-80 bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg"
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#5B8DEF", "#60C689", "#F6C85F"][index % 3]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Testimonials / Use Cases */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Истории успеха
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "FinTech стартап",
              text: "Сократили время на CustDev с 2 месяцев до 1 дня, протестировав гипотезы сразу на виртуальной аудитории.",
            },
            {
              name: "E-commerce компания",
              text: "Протестировали ценовую стратегию перед запуском нового продукта и избежали лишних расходов.",
            },
            {
              name: "EdTech проект",
              text: "Поняли, какой формат обучения предпочитают разные сегменты пользователей, и улучшили retention.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">"{t.text}"</p>
              <div className="text-indigo-600 dark:text-indigo-400 font-semibold">{t.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Тарифы
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              plan: "Free",
              price: "$0",
              features: [
                "1 опрос в месяц",
                "Базовые сегменты",
                "PDF-экспорт",
              ],
            },
            {
              plan: "Pro",
              price: "$19/мес",
              features: [
                "10 опросов в месяц",
                "Расширенные сегменты",
                "PDF/Excel экспорт",
                "Инсайты AI",
              ],
              highlight: true,
            },
            {
              plan: "Team",
              price: "$49/мес",
              features: [
                "Неограниченные опросы",
                "Совместная работа",
                "Полные инсайты",
                "Поддержка 24/7",
              ],
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 rounded-2xl shadow-lg border ${
                p.highlight
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{p.plan}</h3>
              <div className="text-4xl font-extrabold mb-6">{p.price}</div>
              <ul className="mb-6 space-y-2">
                {p.features.map((f, idx) => (
                  <li key={idx} className="text-sm">
                    • {f}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                onClick={handleCreateSurvey}
                className={p.highlight ? "bg-white text-indigo-600 hover:bg-gray-100" : "bg-indigo-600 text-white hover:bg-indigo-700"}
              >
                Выбрать
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          FAQ
        </motion.h2>
        <div className="space-y-6">
          {[
            {
              q: "Насколько реалистичны ответы аудитории?",
              a: "ИИ обучен моделировать поведение сегментов пользователей, основываясь на данных и паттернах. Ответы выглядят как от реальной аудитории, но без затрат времени и денег на интервью.",
            },
            {
              q: "Можно ли выгрузить данные?",
              a: "Да, вы можете скачать PDF или Excel с результатами и инсайтами.",
            },
            {
              q: "Подходит ли для стартапов?",
              a: "Да, инструмент создан именно для быстрого тестирования гипотез на ранних стадиях.",
            },
            {
              q: "Есть ли бесплатный тариф?",
              a: "Да, вы можете попробовать Free-план с ограничением на количество опросов.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Subscribe Section */}
      <section className="py-20 bg-indigo-50 dark:bg-gray-800 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-6"
        >
          Свяжитесь с нами
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Подпишитесь на обновления или оставьте свой email, чтобы получить ранний доступ к новым функциям.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          onSubmit={handleSubscribe}
          className="max-w-md mx-auto flex gap-3"
        >
          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button type="submit" size="lg" className="bg-indigo-600 text-white px-6 hover:bg-indigo-700">
            Отправить
          </Button>
        </motion.form>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Попробуйте AI CustDev прямо сейчас
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={handleCreateSurvey}
            className="shadow-lg bg-white text-indigo-600 hover:bg-gray-100"
          >
            Создать опрос бесплатно
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center">
        <p className="mb-2 font-semibold">© 2025 AI CustDev Simulator</p>
        <p className="text-sm text-gray-400">Сделано с ❤️ для стартапов</p>
      </footer>
    </div>
  );
}
