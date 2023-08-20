const dateTimeFormatter = (datetime = String) => {
    const year = String(datetime).split('-')[0];
    const month = String(datetime).split('-')[1];
    const day = String(datetime).split('-')[2].split('T')[0];
    const time = String(datetime).split('-')[2].split('T')[1].split('.')[0];
    const UTC = String(datetime).split('-')[2].split('T')[1].split('.')[1];
    return `${getMonth(Number(month))} ${day}, ${year}`;
}

const getMonth = (moth = Number) => {
    switch (moth) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
    }
}

const dateReturn = (datetime = String) => {
    const year = String(datetime).split('-')[0];
    const month = String(datetime).split('-')[1];
    const day = String(datetime).split('-')[2].split('T')[0];
    const time = String(datetime).split('-')[2].split('T')[1].split('.')[0];
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    const seconds = time.split(":")[2];
    return new Date(year, month, day, hours, minutes, seconds);
}

export {dateTimeFormatter, dateReturn};