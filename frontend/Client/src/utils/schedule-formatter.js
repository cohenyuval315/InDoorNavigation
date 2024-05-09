
export function stringifySchedule(schedule) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const maxDayLength = Math.max(...days.map(day => day.length));
    
    let scheduleString = '';
    days.forEach(day => {
        const open = schedule[day].open !== null ? formatTime(schedule[day].open) : 'Closed';
        const close = schedule[day].close !== null ? formatTime(schedule[day].close) : 'Closed';
        scheduleString += `${day.padEnd(maxDayLength," ")}: ${open} - ${close}\n`;
    });
    return scheduleString;
}

export function formatTime(time) {
    if (time === null) return 'Closed';
    if (time === 0) return '12 am';
    if (time === 12) return '12 pm';
    if (time < 12) return `${time} am`;
    return `${time - 12} pm`;
}

export function isOpen(schedule) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = new Date().getDay();
    const currentHour = new Date().getHours();
    const currentDay = days[currentDayIndex];
    const nextDay = days[(currentDayIndex + 1) % 7];

    // Check if the current day exists in the schedule
    if (!(currentDay in schedule)) {
        return ["Close", " Schedule information not available for today."];
    }

    const openingHour = schedule[currentDay].open;
    const closingHour = schedule[currentDay].close;

    // Check if openingHour and closingHour are not null
    if (openingHour === null || closingHour === null) {
        return ["Closed", " all day today."];
    } else if (currentHour >= openingHour && currentHour < closingHour) {
        return ["Open", ` until ${closingHour}:00 today.`];
    } else if (currentDay === "Saturday" && currentHour >= closingHour) {
        // Handle the special case for Saturday
        return ["Closed", ` Will reopen at ${openingHour}:00 on ${nextDay}.`];
    } else {
        // Check if it's already the next day
        if (currentHour <= closingHour) {
            return ["Closed", ` Will reopen at ${openingHour}:00 today.`];
        } else {
            // Find the opening hour for the next day
            return ["Closed", ` Will reopen at ${openingHour}:00 on ${nextDay}.`];
        }
    }
}
