const path = require("path");

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

function getFolderPath(folder) {
    const rootFolder = process.env.FOLDER_UPLOAD
    return path.join(path.dirname(__dirname), rootFolder, folder);
}

module.exports = {
    parseDate,
    convertDate,
    getFolderPath
}