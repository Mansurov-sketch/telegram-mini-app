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
});
