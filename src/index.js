const path = require("path");
const { readCSV, writeCSV } = require("./fileHandler");
const { assignSecretSanta } = require("./assigner");

const EMPLOYEE_CSV = path.join(__dirname, "../data/employees.csv");
const PREVIOUS_ASSIGNMENT_CSV = path.join(__dirname, "../data/previous_assignments.csv");
const OUTPUT_CSV = path.join(__dirname, "../data/secret_santa_output.csv");

async function main() {
    try {
        console.log("Reading employee data...");
        const employees = await readCSV(EMPLOYEE_CSV);
        
        console.log("Reading previous assignments...");
        const previousAssignments = await readCSV(PREVIOUS_ASSIGNMENT_CSV);

        console.log("Assigning Secret Santas...");
        const assignments = assignSecretSanta(employees, previousAssignments);

        console.log("Writing assignments to output CSV...");
        writeCSV(OUTPUT_CSV, assignments);

        console.log(`Secret Santa assignments saved to ${OUTPUT_CSV}`);
    } catch (error) {
        console.error("Error occurred:", error.message);
    }
}

main();
