const getGreeting = (currentHours: number) => {
    if (currentHours >= 5 && currentHours < 12) {
        return 'Доброе утро';
    } else if (currentHours >= 12 && currentHours < 18) {
        return 'Добрый день';
    } else if (currentHours >= 18 && currentHours < 22) {
        return 'Добрый вечер';
    } else {
        return 'Доброй ночи';
    }
};

export default getGreeting;
