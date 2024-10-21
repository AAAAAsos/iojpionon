import json
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Функция для обработки команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        f"Привет, {update.effective_user.first_name}! Добро пожаловать в игру Hamster Clicker! Используй команду /balance, чтобы проверить свой баланс."
    )

# Функция для обработки команды /balance
async def balance(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = str(update.effective_user.id)
    try:
        with open('balances.json', 'r') as file:
            balances = json.load(file)
            current_balance = balances.get(user_id, 0)
            await update.message.reply_text(f"Ваш текущий баланс: {current_balance} монет.")
    except FileNotFoundError:
        await update.message.reply_text("Не удалось найти файл с балансами.")
    except Exception as e:
        await update.message.reply_text(f"Произошла ошибка: {e}")

# Основная функция для запуска бота
async def main() -> None:
    # Создайте объект Application и передайте свой токен бота Telegram
    app = ApplicationBuilder().token("7760267747:AAFNzxime6NiLV7WHClF0DIWAObIA5NUU5w").build()

    # Регистрируем команды /start и /balance
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("balance", balance))

    # Запускаем бота
    await app.run_polling()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
