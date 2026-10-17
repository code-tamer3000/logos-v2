# Логос — сайт

Сайт Константина Логоса: React + Vite (фронтенд) и Express + SQLite (API и админка `/admin`).
Один Node-процесс отдаёт API, загруженные файлы и собранный фронтенд.

## Требования

- Node.js **22.5+** (используется встроенный `node:sqlite`)
- npm

## Клонирование и установка

```bash
git clone https://github.com/code-tamer3000/logos-v2.git
cd logos-v2
npm install
cp .env.example .env
```

## Настройка `.env`

```bash
# хэш пароля админки
node -e "console.log(require('bcryptjs').hashSync('ваш-пароль', 10))"
# секрет для JWT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Впишите результаты в `.env` как `ADMIN_PASSWORD_HASH` и `JWT_SECRET`.
Остальное: `PORT` (по умолчанию 3001), `VERSIONS_TO_KEEP` (сколько версий блока хранить для отката).

> Если хэш содержит `$`, при необходимости экранируйте его (`\$`) или возьмите значение в кавычки.

## Запуск для разработки

Два процесса в разных терминалах:

```bash
npm run server   # API на http://localhost:3001
npm run dev      # Vite на http://localhost:5173 (проксирует /api и /uploads)
```

Админка: http://localhost:5173/admin

При старте сервер сам создаёт `server/data.sqlite` и заполняет его блоками из `content/defaults.json`
(`npm run seed` — то же самое вручную).

## Продакшен

```bash
npm run build    # собирает фронтенд в dist/
npm run server   # отдаёт dist/, API и /uploads на $PORT
```

Рекомендуется запускать под systemd и ставить за nginx с HTTPS: cookie сессии при
`NODE_ENV=production` помечается `Secure`, поэтому вход в админку работает только по HTTPS.

## Прочее

- `npm run lint` — oxlint
- `npm run sync:podcast` — синхронизация подкастов из RSS
- `bot/` — отдельный Telegram-бот на Python, см. [bot/README.md](bot/README.md)
- Данные (`server/data.sqlite`, `server/uploads/`) и `.env` в git не хранятся — делайте их резервные копии отдельно.
