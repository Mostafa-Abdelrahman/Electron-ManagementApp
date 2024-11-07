const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the existing SQLite database
const db = new sqlite3.Database(path.join(__dirname, './db/db.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });
  mainWindow.loadFile('main/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    db.close();
    app.quit();
  }
});

// IPC handlers
ipcMain.on('get-all-employees', (event) => {
  db.all('SELECT * FROM employees', (err, rows) => {
    if (err) {
      console.error('Error retrieving data:', err.message);
      event.reply('get-all-employees-response', []);
    } else {
      event.reply('get-all-employees-response', rows);
    }
  });
});

ipcMain.on('add-employee', (event, employeeData) => {
  const stmt = db.prepare('INSERT INTO employees (name, phone, salary, job, residence, employed_data, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
  stmt.run(employeeData, (err) => {
    if (err) {
      console.error('Error adding employee:', err.message);
    }
    event.reply('add-employee-response');
  });
  stmt.finalize();
});

ipcMain.on('update-employee', (event, updatedData) => {
  const [name, phone, salary, job, residence, employed_data, notes, id] = updatedData;
  const stmt = db.prepare('UPDATE employees SET name = ?, phone = ?, salary = ?, job = ?, residence = ?, employed_data = ?, notes = ? WHERE id = ?');
  stmt.run(name, phone, salary, job, residence, employed_data, notes, id, (err) => {
    if (err) {
      console.error('Error updating employee:', err.message);
    }
    event.reply('update-employee-response');
  });
  stmt.finalize();
});

ipcMain.on('delete-employee', (event, id) => {
  const stmt = db.prepare('DELETE FROM employees WHERE id = ?');
  stmt.run(id, (err) => {
    if (err) {
      console.error('Error deleting employee:', err.message);
    }
    event.reply('delete-employee-response');
  });
  stmt.finalize();
});


ipcMain.on('add-employee', (event, employeeData) => {
  const stmt = db.prepare('INSERT INTO employees (name, phone, salary, job, residence, employed_data, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
  stmt.run(employeeData, (err) => {
    if (err) {
      console.error('Error adding employee:', err.message);
    }
    event.reply('add-employee-response'); // Send a response to confirm the addition
  });
  stmt.finalize();
});
