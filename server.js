const express = require('express');
const path = require('path');
const { Telegraf, Markup } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 3000;

// Токен вашего бота от @BotFather
const BOT_TOKEN = '7788845291:AAGYYHWPw09k0D7vD9r9c3yzBjIScGS7TUQ';
// URL вашего Mini App
const WEB_APP_URL = 'https://telegram-mini-app-3-0jjt.onrender.com';

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

// Запуск бота
bot.launch();

// Настройка Express для обслуживания статических файлов
app.use(express.static(__dirname));

// Отправка index.html для всех остальных запросов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
