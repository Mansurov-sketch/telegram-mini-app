document.addEventListener("DOMContentLoaded", function () {
    let tg = window.Telegram.WebApp;

    // Получаем данные пользователя
    let user = tg.initDataUnsafe.user;
    if (user) {
        document.getElementById("userName").textContent = user.first_name;
        document.getElementById("userId").textContent = `ID: ${user.id}`;
        document.getElementById("userPhoto").src = user.photo_url || "default-avatar.png";
    }

    tg.expand(); // Разворачиваем WebApp на весь экран

    // Функционал для эмоциональных состояний
    const emotionInput = document.getElementById('emotionInput');
    const saveEmotionButton = document.getElementById('saveEmotion');
    const editEmotionButton = document.getElementById('editEmotion');
    const deleteEmotionButton = document.getElementById('deleteEmotion');
    const emotionList = document.getElementById('emotionList');

    let emotions = [];

    saveEmotionButton.addEventListener('click', () => {
        const emotionText = emotionInput.value;
        if (emotionText) {
            emotions.push(emotionText);
            renderEmotions();
            emotionInput.value = '';
        }
    });

    editEmotionButton.addEventListener('click', () => {
        const index = prompt('Введите номер эмоционального состояния для редактирования');
        if (index && index >= 0 && index < emotions.length) {
            const newEmotion = prompt('Введите новое эмоциональное состояние');
            if (newEmotion) {
                emotions[index] = newEmotion;
                renderEmotions();
            }
        }
    });

    deleteEmotionButton.addEventListener('click', () => {
        const index = prompt('Введите номер эмоционального состояния для удаления');
        if (index && index >= 0 && index < emotions.length) {
            emotions.splice(index, 1);
            renderEmotions();
        }
    });

    function renderEmotions() {
        emotionList.innerHTML = '';
        emotions.forEach((emotion, index) => {
            const emotionElement = document.createElement('p');
            emotionElement.textContent = `${index + 1}. ${emotion}`;
            emotionList.appendChild(emotionElement);
        });
    }

    // Прогноз дня
    async function getForecast() {
        try {
            const response = await fetch('http://wttr.in/Moscow?format=j1');
            const data = await response.json();
            const forecastText = data.current_condition[0].weatherDesc[0].value;
            document.getElementById('forecast').textContent = forecastText;
        } catch (error) {
            console.error('Ошибка при получении прогноза:', error);
        }
    }

    getForecast();

    // Админская панель
    const loadEntriesButton = document.getElementById('loadEntries');
    const entriesList = document.getElementById('entriesList');

    loadEntriesButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/entries');
            const entries = await response.json();
            entriesList.innerHTML = '';
            entries.forEach((entry) => {
                const entryElement = document.createElement('p');
                entryElement.textContent = entry.text;
                entriesList.appendChild(entryElement);
            });
        } catch (error) {
            console.error('Ошибка при загрузке записей:', error);
        }
    });
});
