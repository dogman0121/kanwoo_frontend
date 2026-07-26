export default function getPassedDateString(date: string): string {
    const dateObject = new Date(date);
    const currentDate = Date.now()

    console.log(dateObject, new Date(currentDate))

    // Разница в секундах (округляем вниз)
    const diffSeconds = Math.floor((currentDate - dateObject.getTime()) / 1000);
    console.log(diffSeconds)
    // Если дата в будущем – можно вернуть что-то по умолчанию
    if (diffSeconds < 0) {
        return "в будущем";
    }

    // Вспомогательная функция для склонения числительных
    function pluralize(number: number, one: string, two: string, five: string): string {
        const n = Math.abs(number);
        const lastDigit = n % 10;
        const lastTwoDigits = n % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) return one;
        if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) return two;
        return five;
    }

    // Менее 5 секунд – "только что"
    if (diffSeconds < 5) {
        return "только что";
    }

    // Секунды
    if (diffSeconds < 60) {
        const sec = diffSeconds;
        return `${sec} ${pluralize(sec, "секунду", "секунды", "секунд")} назад`;
    }

    // Минуты
    if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60);

        return `${minutes} ${pluralize(minutes, "минуту", "минуты", "минут")} назад`;
    }

    // Часы
    if (diffSeconds < 86400) {
        const hours = Math.floor(diffSeconds / 3600);
        return `${hours} ${pluralize(hours, "час", "часа", "часов")} назад`;
    }

    // Дни (до 7 дней)
    if (diffSeconds < 604800) {
        const days = Math.floor(diffSeconds / 86400);
        if (days === 1) {
            return "вчера";
        }
        return `${days} ${pluralize(days, "день", "дня", "дней")} назад`;
    }

    // Недели (до 30 дней)
    if (diffSeconds < 2592000) {
        const weeks = Math.floor(diffSeconds / 604800);
        if (weeks === 1) {
            return "на прошлой неделе";
        }
        return `${weeks} ${pluralize(weeks, "неделя", "недели", "недель")} назад`;
    }

    // Месяцы (до 365 дней)
    if (diffSeconds < 31536000) {
        const months = Math.floor(diffSeconds / 2592000);
        return `${months} ${pluralize(months, "месяц", "месяца", "месяцев")} назад`;
    }

    // Годы
    const years = Math.floor(diffSeconds / 31536000);
    return `${years} ${pluralize(years, "год", "года", "лет")} назад`;
}