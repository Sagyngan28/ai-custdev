# AI CustDev Simulator

🚀 **AI-powered Customer Development Simulator** - создавайте опросы и получайте реалистичные инсайты о вашей аудитории с помощью GLM-4.5-Flash.

## ✨ Возможности

- 🎯 **Создание опросов** - интуитивный интерфейс для создания вопросов и вариантов ответов
- 🤖 **GLM-4.5-Flash интеграция** - генерация реалистичных сегментов аудитории и ответов
- 📊 **Интерактивная аналитика** - красивые графики с анимациями (Recharts + Framer Motion)
- 💡 **AI инсайты** - автоматическая генерация бизнес-рекомендаций
- 📈 **Экспорт данных** - CSV, Excel и PDF экспорт результатов
- 🌙 **Темная/светлая тема** - адаптивный дизайн с переключением тем
- 📱 **Responsive дизайн** - работает на всех устройствах

## 🛠 Технологический стек

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **AI**: GLM-4.5-Flash API
- **Charts**: Recharts
- **Export**: XLSX, jsPDF, html2canvas

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
git clone <repository-url>
cd ai-custdev-simulator
npm install
```

### 2. Настройка базы данных

1. Создайте аккаунт в [Neon](https://neon.tech)
2. Создайте новую базу данных
3. Выполните SQL-скрипт из `migrate.sql` в консоли Neon

### 3. Настройка переменных окружения

Скопируйте `.env.example` в `.env.local`:

```bash
cp .env.example .env.local
```

Заполните переменные в `.env.local`:

```env
# PostgreSQL connection string (Neon database)
DATABASE_URL="postgresql://neondb_owner:npg_uHSVCp8Ib2Ud@ep-billowing-violet-agga6i6n-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# GLM-4.5-Flash API configuration
GLM_API_KEY="your_glm_api_key_here"
GLM_API_URL="https://open.bigmodel.cn/api/paas/v4/chat/completions"

# Optional: set this if you open the app via a different host than localhost:3000
# NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Получение GLM API ключа

1. Зарегистрируйтесь на [GLM Platform](https://open.bigmodel.cn)
2. Создайте API ключ
3. Добавьте ключ в `.env.local`

### 5. Запуск приложения

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📖 Использование

### Создание опроса

1. **Заполните нишу** - укажите вашу бизнес-нишу (например: EdTech, FinTech)
2. **Добавьте название** - опишите цель опроса
3. **Создайте вопросы** - добавьте вопросы с вариантами ответов
4. **Запустите генерацию** - GLM-4.5-Flash создаст сегменты и симулирует ответы

### Анализ результатов

- 📊 **Графики** - круговые и столбчатые диаграммы с анимациями
- 👥 **Сегменты** - детальная информация о каждом сегменте аудитории
- 💡 **Инсайты** - AI-генерированные рекомендации для бизнеса
- 📤 **Экспорт** - скачивание данных в различных форматах

## 🏗 Архитектура

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API маршруты
│   │   ├── surveys/       # CRUD для опросов
│   │   ├── segments/      # Генерация сегментов
│   │   ├── responses/     # Симуляция ответов
│   │   └── results/       # Агрегация результатов
│   ├── dashboard/         # Страница аналитики
│   └── page.tsx          # Главная страница
├── components/            # React компоненты
│   ├── ui/               # Базовые UI компоненты
│   ├── ChartPie.tsx      # Круговые диаграммы
│   ├── ChartBar.tsx      # Столбчатые диаграммы
│   ├── SegmentList.tsx   # Список сегментов
│   ├── Insights.tsx      # Инсайты
│   └── LoadingSpinner.tsx # Анимированный лоадер
├── lib/                  # Утилиты и библиотеки
│   ├── glm.ts           # GLM-4.5-Flash интеграция
│   ├── simulator.ts     # Fallback симуляция
│   ├── export.ts        # Экспорт данных
│   └── utils.ts         # Общие утилиты
└── db/                   # База данных
    ├── client.ts        # Drizzle клиент
    └── schema.ts        # Схема БД
```

## 🔧 API Endpoints

- `POST /api/surveys` - Создание опроса
- `GET /api/surveys?id=` - Получение опроса
- `POST /api/segments` - Генерация сегментов (GLM)
- `POST /api/responses` - Симуляция ответов (GLM)
- `GET /api/results?surveyId=` - Получение результатов

## 🎨 Анимации

Приложение использует Framer Motion для создания плавных анимаций:

- ✨ **Загрузка компонентов** - fade-in эффекты
- 📊 **Графики** - анимированное появление данных
- 🎯 **Сегменты** - staggered анимации карточек
- 💡 **Инсайты** - последовательное появление с иконками
- 🔄 **GLM лоадер** - специальная анимация для AI обработки

## 🚀 Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках проекта
3. Деплой произойдет автоматически

### Другие платформы

Приложение совместимо с любыми платформами, поддерживающими Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для подробностей.

## 🆘 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте [Issues](../../issues) на GitHub
2. Создайте новый Issue с подробным описанием
3. Убедитесь, что все переменные окружения настроены правильно

## 🔮 Roadmap

- [ ] Интеграция с другими AI моделями (GPT-4, Claude)
- [ ] Расширенная аналитика и метрики
- [ ] Collaborative опросы для команд
- [ ] Интеграция с CRM системами
- [ ] A/B тестирование вопросов
- [ ] Мультиязычная поддержка

## Стек
- Next.js 14 (App Router)
- TailwindCSS + (UI компоненты на базе shadcn/ui)
- Recharts (диаграммы)
- Drizzle ORM + Neon.tech (PostgreSQL)
- Framer Motion (зарезервировано)
- GLM‑4.5‑Flash (mock → API)

## Структура
```
/src
  /app
    /api/{surveys,segments,responses,results}/route.ts
    /dashboard/[id]/page.tsx
    /layout.tsx
    /page.tsx
  /components
    ChartPie.tsx
    ChartBar.tsx
    SegmentList.tsx
    Insights.tsx
    /ui/button.tsx
  /db
    schema.ts
    client.ts
  /lib
    glm.ts
    simulator.ts
    utils.ts
```

## Быстрый старт
1) Установите Node.js LTS (18+): https://nodejs.org/ (перезапустите терминал после установки)

2) Установите зависимости:
```
npm install
```

3) Настройте переменные окружения:
- Скопируйте файл `.env.example` в `.env.local` и заполните `DATABASE_URL` строкой подключения Neon или локального PostgreSQL.

4) Запустите dev-сервер:
```
npm run dev
```
Откройте http://localhost:3000

## Миграции/Схема
Drizzle работает без генерации типов, но для миграций используйте drizzle-kit:
```
# Генерация миграций
npm run db:generate

# Применение миграций
npm run db:migrate

# Studio (GUI)
npm run db:studio
```

## API
- POST `/api/surveys` — создать опрос (вопросы и варианты)
- POST `/api/segments` — сгенерировать сегменты (mock)
- POST `/api/responses` — симулировать ответы
- GET `/api/results?surveyId=...` — агрегаты + инсайты

## Примечания
- Для продакшна замените mock в `src/lib/glm.ts` на реальный вызов GLM‑4.5‑Flash API.
- Для хоста, отличного от localhost, можно задать `NEXT_PUBLIC_BASE_URL` для SSR‑запросов (страница дэшборда).
