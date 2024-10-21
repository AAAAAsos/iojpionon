let balance = 0; // Изначальный баланс пользователя
const balanceElement = document.getElementById('balance'); // Элемент, который отображает баланс на странице
const hamster = document.getElementById('hamster'); // Картинка хомяка, на которую пользователь будет кликать

// Функция для обновления баланса (только локально, для тестирования)
function updateBalanceOnServer(increment) {
    balance += increment; // Прибавляем к текущему балансу значение increment
    balanceElement.textContent = balance; // Обновляем отображение баланса на странице
    console.log(`Обновленный локальный баланс: ${balance}`); // Логируем обновленный баланс в консоль для отладки
}

// Обработчик кликов на хомяке
hamster.addEventListener('click', function() {
    const incrementValue = 11; // Значение, которое прибавляем за каждый клик (например, 11 монет)
    updateBalanceOnServer(incrementValue); // Вызываем функцию обновления баланса
});
