const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Read the SQL schema from the schema.sql file
const schema = fs.readFileSync('schema.sql', 'utf8');

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('db.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Execute the schema SQL
db.exec(schema, (err) => {
    if (err) {
        return console.error('Error executing schema:', err.message);
    }
    console.log('Schema loaded and tables created successfully.');
});

// Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection.');
});


