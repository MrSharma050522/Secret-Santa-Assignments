const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

/**
 * Assigns Secret Santa children to employees.
 * @param {Array} employees - List of employees.
 * @param {Array} previousAssignments - Last year's assignments.
 * @returns {Array} - List with Secret Santa assignments.
 */
function assignSecretSanta(employees, previousAssignments) {
    const assignments = new Map();
    const previousMap = new Map(previousAssignments.map(e => [e.Employee_EmailID, e.Secret_Child_EmailID]));

    let shuffled = shuffleArray([...employees]);

    for (let i = 0; i < employees.length; i++) {
        let giver = employees[i];

        for (let j = 0; j < shuffled.length; j++) {
            let receiver = shuffled[j];

            if (
                giver.Employee_EmailID !== receiver.Employee_EmailID && // Not self
                previousMap.get(giver.Employee_EmailID) !== receiver.Employee_EmailID // Not previous year's child
            ) {
                assignments.set(giver.Employee_EmailID, receiver);
                shuffled.splice(j, 1); // Remove assigned receiver
                break;
            }
        }
    }

    // Convert assignments to required format
    return employees.map(emp => ({
        Employee_Name: emp.Employee_Name,
        Employee_EmailID: emp.Employee_EmailID,
        Secret_Child_Name: assignments.get(emp.Employee_EmailID)?.Employee_Name || "N/A",
        Secret_Child_EmailID: assignments.get(emp.Employee_EmailID)?.Employee_EmailID || "N/A"
    }));
}

module.exports = { assignSecretSanta };
