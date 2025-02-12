const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

/**
 * Assigns Secret Santa children to employees.
 * @param {Array} employees - List of employees.
 * @param {Array} previousAssignments - Last year's assignments.
 * @returns {Array} - List with Secret Santa assignments.
 */
function assignSecretSanta(employees, previousAssignments) {
    // Create a map to store the current year's assignments
    const assignments = new Map();

    // Convert previous assignments into a map for quick lookup
    const previousMap = new Map(previousAssignments.map(e => [e.Employee_EmailID, e.Secret_Child_EmailID]));

    // Shuffle the employee list to ensure randomization in assignments
    let shuffled = shuffleArray([...employees]);

    // Iterate through each employee to assign a Secret Santa recipient
    for (let i = 0; i < employees.length; i++) {
        let giver = employees[i];

        // Try to find a valid receiver from the shuffled list
        for (let j = 0; j < shuffled.length; j++) {
            let receiver = shuffled[j];

            // Ensure the giver is not assigned to themselves and that last year's match is avoided
            if (
                giver.Employee_EmailID !== receiver.Employee_EmailID && 
                previousMap.get(giver.Employee_EmailID) !== receiver.Employee_EmailID
            ) {
                // Assign the receiver to the giver
                assignments.set(giver.Employee_EmailID, receiver);

                // Remove the assigned receiver from the list to prevent duplicate assignments
                shuffled.splice(j, 1);
                break;
            }
        }
    }

    // Convert the assignments into the required output format
    return employees.map(emp => ({
        Employee_Name: emp.Employee_Name,
        Employee_EmailID: emp.Employee_EmailID,
        Secret_Child_Name: assignments.get(emp.Employee_EmailID)?.Employee_Name || "N/A",
        Secret_Child_EmailID: assignments.get(emp.Employee_EmailID)?.Employee_EmailID || "N/A"
    }));
}

module.exports = { assignSecretSanta };
