export const getDate = (amount: number = 0, unit: string = 'd',  rounded: boolean = false): Date => {
    const now = new Date();
    let newDate = new Date(now);

    switch (unit) {
        case 'y':
            newDate.setFullYear(now.getFullYear() + amount);
            break;
        case 'm':
            newDate.setMonth(now.getMonth() + amount);
            break;
        case 'd':
            newDate.setDate(now.getDate() + amount);
            break;
        case 'h':
            newDate.setHours(now.getHours() + amount);
            break;
        case 'min':
            newDate.setMinutes(now.getMinutes() + amount);
            break;
        case 's':
            newDate.setSeconds(now.getSeconds() + amount);
            break;
        default:
            throw new Error(`Invalid unit '${unit}'`);
    }

    if (rounded) {
        const minute = newDate.getMinutes();
        const roundedMinute = Math.round(minute / 15) * 15;
        newDate.setMinutes(roundedMinute);
        newDate.setSeconds(0);
    }

    return newDate;
};
