function parseDate(date) {
    const extractDate = new Date(date)
    day =  extractDate.getDate() < 10 ? "0"+extractDate.getDate() : extractDate.getDate();
    month = extractDate.getMonth()+1 < 10 ? "0"+(extractDate.getMonth()+1) : extractDate.getMonth()+1;
    year = extractDate.getFullYear();

    return `${day}/${month}/${year}`
}

module.exports = {
    parseDate
}