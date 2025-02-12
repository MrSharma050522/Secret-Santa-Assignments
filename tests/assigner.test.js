const { assignSecretSanta } = require("../src/assigner");

test("Assigns Secret Santas correctly", () => {
    const employees = [
        { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
        { Employee_Name: "Bob", Employee_EmailID: "bob@example.com" },
        { Employee_Name: "Charlie", Employee_EmailID: "charlie@example.com" },
        { Employee_Name: "Dave", Employee_EmailID: "dave@example.com" }
    ];

    const previousAssignments = [
        { Employee_EmailID: "alice@example.com", Secret_Child_EmailID: "bob@example.com" },
        { Employee_EmailID: "bob@example.com", Secret_Child_EmailID: "charlie@example.com" }
    ];

    const result = assignSecretSanta(employees, previousAssignments);
    
    expect(result.length).toBe(4);
    expect(result.some(r => r.Employee_EmailID === r.Secret_Child_EmailID)).toBe(false); // No self-assignments
});
