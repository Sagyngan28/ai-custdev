# 🚀 Пошаговая настройка AI CustDev Simulator

## 📋 Предварительные требования

- Node.js 18+ 
- npm или yarn
- Аккаунт в [Neon.tech](https://neon.tech) (PostgreSQL)
- API ключ GLM-4.5-Flash (опционально)

## 🔧 Шаг 1: Установка зависимостей

```bash
npm install
```

## 🗄️ Шаг 2: Настройка базы данных

### 2.1 Создание базы данных в Neon

1. Зайдите на [neon.tech](https://neon.tech)
2. Создайте новый проект
3. Скопируйте строку подключения

### 2.2 Настройка переменных окружения

Создайте файл `.env.local`:

```bash
cp .env.example .env.local
```

Заполните переменные в `.env.local`:

```env
# Обязательно - строка подключения к Neon
DATABASE_URL="postgresql://neondb_owner:npg_uHSVCp8Ib2Ud@ep-billowing-violet-agga6i6n-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Опционально - GLM API (если нет, будут использоваться моки)
GLM_API_KEY="your_glm_api_key_here"
GLM_API_URL="https://open.bigmodel.cn/api/paas/v4/chat/completions"

# Опционально - базовый URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 2.3 Запуск миграции

```bash
npm run db:setup
```

Вы должны увидеть:
```
✅ Database migration completed successfully!
🎉 Your database is ready for the AI CustDev Simulator
```

## 🤖 Шаг 3: Получение GLM API ключа (опционально)

1. Зарегистрируйтесь на [GLM Platform](https://open.bigmodel.cn)
2. Создайте API ключ
3. Добавьте его в `.env.local`

**Примечание**: Если GLM ключ не настроен, приложение будет использовать моки с реалистичными данными.

## 🚀 Шаг 4: Запуск приложения

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## ✅ Проверка работоспособности

### Тест 1: Главная страница
- [ ] Страница загружается без ошибок
- [ ] Можно ввести нишу и название опроса
- [ ] Можно добавлять/удалять вопросы и варианты ответов
- [ ] Переключение темы работает

### Тест 2: Создание опроса
1. Заполните форму:
   - Ниша: "EdTech"
   - Название: "Тест опроса"
   - Добавьте 2-3 вопроса с вариантами ответов
2. Нажмите "Сгенерировать аудиторию"
3. Должны появиться анимированные лоадеры
4. Переход на страницу дашборда

### Тест 3: Дашборд
- [ ] Графики загружаются с анимациями
- [ ] Отображаются сегменты аудитории
- [ ] Показываются инсайты
- [ ] Работают кнопки экспорта
- [ ] Копирование ссылки работает

## 🐛 Устранение проблем

### Ошибка подключения к базе данных
```
Error: Connection failed
```
**Решение**: Проверьте строку подключения в `.env.local`

### GLM API ошибки
```
GLM API call failed
```
**Решение**: Проверьте API ключ или работайте без GLM (используются моки)

### Ошибки компиляции
```
Module not found
```
**Решение**: Запустите `npm install` повторно

### Порт занят
```
Port 3000 is already in use
```
**Решение**: Next.js автоматически выберет другой порт (3001, 3002, etc.)

## 📊 Структура данных

### Surveys (Опросы)
- id, niche, title, created_at

### Questions (Вопросы)
- id, survey_id, text, type

### Options (Варианты ответов)
- id, question_id, text

### Segments (Сегменты аудитории)
- id, survey_id, name, percentage, persona

### Results (Результаты)
- id, question_id, option_id, segment_id, value

## 🔄 Режимы работы

### С GLM-4.5-Flash
- Реальная генерация сегментов на основе ниши
- Умная симуляция ответов
- AI-генерированные инсайты

### Без GLM (Fallback)
- Предустановленные сегменты
- Алгоритмическая симуляция ответов
- Статические инсайты

## 📈 Производительность

- Первая загрузка: ~2-3 секунды
- Генерация с GLM: ~5-10 секунд
- Генерация без GLM: ~1-2 секунды
- Рендер дашборда: ~1 секунда

## 🎨 Кастомизация

### Цвета графиков
Измените в `src/components/ChartPie.tsx`:
```typescript
const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];
```

### Анимации
Настройте в компонентах с Framer Motion:
```typescript
transition={{ duration: 0.6, ease: "easeOut" }}
```

### Промпты GLM
Измените в `src/lib/glm.ts` функции:
- `generateSegments()`
- `generateResponses()`
- `generateInsights()`

## 🚀 Деплой

### Vercel (рекомендуется)
1. Подключите GitHub репозиторий
2. Добавьте переменные окружения
3. Деплой автоматический

### Другие платформы
- Netlify
- Railway  
- Render
- DigitalOcean App Platform

Все поддерживают Next.js 14 из коробки.

## 📞 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Проверьте логи сервера в терминале
3. Убедитесь, что все переменные окружения настроены
4. Создайте Issue в GitHub репозитории
