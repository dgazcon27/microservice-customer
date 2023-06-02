function parseDate(date = new Date()) {
    const {day, month, year} = extractDate(date)
    return `${day}/${month}/${year}`
}

function convertDate(date = new Date()) {
    const {day, month, year} = extractDate(date)
    return `${month}/${day}/${year}`
}

function extractDate(date) {
    const extractDate = new Date(date)
    day =  extractDate.getDate() < 10 ? "0"+extractDate.getDate() : extractDate.getDate();
    month = extractDate.getMonth()+1 < 10 ? "0"+(extractDate.getMonth()+1) : extractDate.getMonth()+1;
    year = extractDate.getFullYear();

    return {day, month, year}

}

module.exports = {
    parseDate,
    convertDate
}