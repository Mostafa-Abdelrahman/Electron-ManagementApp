const { ipcRenderer } = require('electron');
/*
async function fetchData() {
    try {
        // Request data from main process
        const data = await ipcRenderer.invoke('get-data');
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    // Select the element to display data (e.g., a div with id 'data-container')
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Clear any existing data

    // Format data into HTML
    data.forEach(row => {
        const item = document.createElement('p');
        item.textContent = `User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`;
        container.appendChild(item);
    });
}

// Fetch data on page load
window.onload = fetchData;
*/