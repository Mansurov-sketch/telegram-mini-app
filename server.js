const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Обслуживание статических файлов из директории "public" (или текущей директории)
app.use(express.static(__dirname));

// Отправка index.html для всех остальных запросов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
