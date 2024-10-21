let balance = 0;
const balanceElement = document.getElementById('balance');
const hamster = document.getElementById('hamster');
const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id || 0;

// Функция для обновления баланса на сервере
function updateBalanceOnServer(increment) {
    fetch('http://127.0.0.1:3000/updateBalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, increment: increment })
    })
    .then(response => response.json())
    .then(data => {
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
