const express = require('express');
const app = express();
const port = 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

// Iniciar servidor


const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database object
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for in-memory database or provide a file path for a persistent database

// Connect to the SQLite database
db.serialize(() => {
  console.log('Connected successfully to the database');

  // Create a table
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');

  // Insert a row
  const insertQuery = 'INSERT INTO users (name) VALUES (?)';
  const name = 'Yesenia Hernández';

  db.run(insertQuery, name, function (err) {
    if (err) {
      console.error('Failed to insert row:', err);
      return;
    }

    console.log(`Row inserted with ID: ${this.lastID}`);
    // Query rows
    
  });

  const insertQuery2 = 'INSERT INTO users (name) VALUES (?)';
  const name2 = 'Edgar Cano';

  db.run(insertQuery2, name2, function (err) {
    if (err) {
      console.error('Failed to insert row:', err);
      return;
    }

    console.log(`Row inserted with ID: ${this.lastID}`);
    // Query rows
    
  });




});


app.get('/obtener-usuarios', (req, res)=>{

    const selectQuery = 'SELECT * FROM users';

    db.all(selectQuery, (err, rows) => {
        if (err) {
          console.error('Failed to query rows:', err);
          return;
        }
  
        console.log('Rows:', rows);


    res.send(rows);
    });
});


app.get('/eliminar/:id', (req, res) => {
    const userId = req.params.id;

    const deleteQuery = 'DELETE FROM users WHERE id = ' + userId;

    db.all(deleteQuery, (err, rows) => {
        if (err) {
          console.error('Failed to query rows:', err);
          return;
        }
  
    res.send('Se ha eliminado el usuario con id:' + userId);
    });

  });


app.listen(port,'192.168.0.13', () => {
    console.log(`La aplicación está funcionando en http://localhost:${port}`);
  });