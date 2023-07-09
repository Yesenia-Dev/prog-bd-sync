const { Pool } = require('pg');

// Connection configuration
const config = {
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
};

// Create a new pool
const pool = new Pool(config);

// Connect to the PostgreSQL server
pool.connect((err, client, done) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  console.log('Connected successfully to the database');

  // Perform database operations
  const query = 'SELECT * FROM users';

  // Execute a query
  client.query(query, (err, result) => {
    done(); // Release the client back to the pool

    if (err) {
      console.error('Failed to execute query:', err);
      return;
    }

    console.log('Result:', result.rows);

    // Close the pool (optional)
    pool.end();
  });
});
