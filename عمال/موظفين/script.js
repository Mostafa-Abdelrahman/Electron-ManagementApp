const ipcRenderer = window.electron.ipcRenderer;

// Function to populate table with employee data
function populateEmployeeTable(employees) {
    const tableBody = document.getElementById('editableTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 
    

    employees.forEach(employee => {
        const newRow = tableBody.insertRow();
        let count = 1;

        Object.values(employee).forEach(value => {
           
            if(count < 1){
                const cell = newRow.insertCell();
                const textNode = document.createTextNode(value);
                cell.appendChild(textNode);
            }
            count--;
            
        });

        const actionsCell = newRow.insertCell(7);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerText = 'Delete';

        // Add delete button event listener
        deleteBtn.addEventListener('click', () => {
            ipcRenderer.send('delete-employee', employee.id); // Send delete request
            newRow.remove(); // Remove row from the screen
        });

        actionsCell.appendChild(deleteBtn);
    });
}

// Listen for the delete confirmation from the main process
ipcRenderer.on('delete-employee-response', () => {
    console.log('Employee deleted successfully from the database.');
});

// Request all employees on page load
window.onload = () => { 
    ipcRenderer.send('get-all-employees');
};

// Listen for the response from the main process and populate the table
ipcRenderer.on('get-all-employees-response', (employees) => {
    populateEmployeeTable(employees);
});

document.getElementById('addRowBtn').addEventListener('click', function () {
    const table = document.getElementById('editableTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Creating cells with input fields
    const nameCell = newRow.insertCell(0);
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameCell.appendChild(nameInput);

    const phoneCell = newRow.insertCell(1);
    const phoneInput = document.createElement('input');
    phoneInput.type = 'number';
    phoneCell.appendChild(phoneInput);

    const salaryCell = newRow.insertCell(2);
    const salaryInput = document.createElement('input');
    salaryInput.type = 'number';
    salaryInput.step = '0.01';
    salaryCell.appendChild(salaryInput);

    const jobCell = newRow.insertCell(3);
    const jobInput = document.createElement('input');
    jobInput.type = 'text';
    jobCell.appendChild(jobInput);

    const residenceCell = newRow.insertCell(4);
    const residenceInput = document.createElement('input');
    residenceInput.type = 'text';
    residenceCell.appendChild(residenceInput);

    const employedDataCell = newRow.insertCell(5);
    const employedDataInput = document.createElement('input');
    employedDataInput.type = 'date';
    employedDataCell.appendChild(employedDataInput);

    const notesCell = newRow.insertCell(6);
    const notesInput = document.createElement('input');
    notesInput.type = 'text';
    notesCell.appendChild(notesInput);

    // Action cell with save button
    const actionsCell = newRow.insertCell(7);
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.innerText = 'Save';
    actionsCell.appendChild(saveBtn);

    // Save button functionality
    saveBtn.addEventListener('click', function () {
        const employeeData = [
            nameInput.value,
            phoneInput.value,
            salaryInput.value,
            jobInput.value,
            residenceInput.value,
            employedDataInput.value,
            notesInput.value
        ];

        // Send the employee data to the backend to add to the database
        ipcRenderer.send('add-employee', employeeData);
        
        saveBtn.remove(); // Remove the save button after saving
    });
});

// Listen for the confirmation that the employee was added
ipcRenderer.on('add-employee-response', () => {
    console.log('Employee added successfully to the database.');
    ipcRenderer.send('get-all-employees'); // Refresh the table to show updated data
});
