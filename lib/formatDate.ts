export function formatDate(date: Date){
    const months = [
        'ene', // January
        'feb', // February
        'mar', // March
        'abr', // April
        'may', // May
        'jun', // June
        'jul', // July
        'ago', // August
        'sep', // September
        'oct', // October
        'nov', // November
        'dic'  // December
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month}, ${year}`
}