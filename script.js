let balance = 0;
const balanceElement = document.getElementById('balance');
const hamster = document.getElementById('hamster');
const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id || 0; // Получаем ID пользователя из Telegram

// Отправляем ID пользователя на сервер для инициализации его баланса
function initializeUser(userId) {
    fetch(`http://127.0.0.1:5000/balance/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ increment: 0 }) // Инициализируем пользователя с нулевым балансом
    })
    .then(response => response.json())
    .then(data => {
        console.log('Баланс инициализирован:', data.balance);
        balance = data.balance;
        balanceElement.textContent = balance;
    })
    .catch(error => {
        console.error('Ошибка при инициализации пользователя:', error);
    });
}

// Функция для обновления баланса на сервере
function updateBalanceOnServer(increment) {
    fetch(`http://127.0.0.1:5000/balance/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ increment: increment })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Обновленный баланс:', data.balance);
        balance = data.balance;
        balanceElement.textContent = balance;
    })
    .catch(error => {
        console.error('Ошибка при обновлении баланса на сервере:', error);
    });
}

// Основная логика клика
hamster.addEventListener('click', function() {
    if (userId !== 0) {
        balance += 11;
        updateBalanceOnServer(11);
    } else {
        console.error("Не удалось получить ID пользователя.");
    }
});

// Инициализируем пользователя, когда скрипт загружается
if (userId !== 0) {
    initializeUser(userId);
} else {
    console.error("Не удалось получить ID пользователя.");
}
