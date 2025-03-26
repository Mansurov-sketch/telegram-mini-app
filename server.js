const express = require('express');
const path = require('path');
const { Telegraf, Markup } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 3000;

// Токен вашего бота от @BotFather
const BOT_TOKEN = '7788845291:AAGYYHWPw09k0D7vD9r9c3yzBjIScGS7TUQ';
// URL вашего Mini App
const WEB_APP_URL = 'https://telegram-mini-app-3-0jjt.onrender.com';

// URL вашего Render-сервера (установите как переменную окружения)
const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;

// Настройка Telegraf
const bot = new Telegraf(BOT_TOKEN);

// Команда /start для отправки кнопки запуска Mini App
bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать! 🚀 Нажмите на кнопку ниже, чтобы открыть приложение:',
        Markup.keyboard([
            Markup.button.webApp('Открыть приложение', WEB_APP_URL)
        ]).resize()
    );
});

// Настройка Express для обслуживания статических файлов
app.use(express.static(__dirname));

// Отправка index.html для всех остальных запросов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API для админской панели (заглушка)
app.get('/api/entries', (req, res) => {
    res.json([
        { text: 'Запись 1' },
        { text: 'Запись 2' },
    ]);
});

// Обработка webhook
app.use(bot.webhookCallback(`/webhook/${BOT_TOKEN}`));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

// Установка webhook
if (RENDER_EXTERNAL_URL) {
    bot.telegram.setWebhook(`${RENDER_EXTERNAL_URL}/webhook/${BOT_TOKEN}`)
        .then(() => console.log('Webhook is set up'))
        .catch(err => console.error('Error setting webhook:', err));
} else {
    console.warn('RENDER_EXTERNAL_URL is not set. Make sure to configure it in Render.');
}

// Запуск бота (Webhooks)
bot.launch();
