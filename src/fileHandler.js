const fs = require("fs");
const csv = require("csv-parser");
const fastCsv = require("fast-csv");

/**
 * Reads CSV file and returns data as an array of objects.
 * @param {string} filePath - Path to the CSV file.
 * @returns {Promise<Array>} - List of employee records.
 */
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => data.push(row))
            .on("end", () => resolve(data))
            .on("error", (err) => reject(err));
    });
}

/**
 * Writes an array of objects to a CSV file.
 * @param {string} filePath - Output CSV file path.
 * @param {Array} data - Data to write.
 */
function writeCSV(filePath, data) {
    const ws = fs.createWriteStream(filePath);
    fastCsv.write(data, { headers: true }).pipe(ws);
}

module.exports = { readCSV, writeCSV };
