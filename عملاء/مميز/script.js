document.getElementById('addRowBtn').addEventListener('click', function () {
    const table = document.getElementById('editableTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Adding editable cells
    for (let i = 0; i < 15; i++) {
        const newCell = newRow.insertCell(i);
        const input = document.createElement('input');
        input.type = 'text';
        newCell.appendChild(input);
    }

    // Add action buttons for editing/deleting
    const actionsCell = newRow.insertCell(15);
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.innerText = 'Save';
    actionsCell.appendChild(saveBtn);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerText = 'Edit';
    actionsCell.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Delete';
    actionsCell.appendChild(deleteBtn);

    // Delete row functionality
    deleteBtn.addEventListener('click', function () {
        table.deleteRow(newRow.rowIndex - 1);
    });

    // Edit row functionality (if needed)
    editBtn.addEventListener('click', function () {
        const inputs = newRow.querySelectorAll('input');
        inputs.forEach(input => {
            input.disabled = !input.disabled; // Toggle edit state
        });
    });
});
