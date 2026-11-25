const mysql = require('mysql');
const express = require('express');
const bcrypt = require('bcrypt');

// Database settings come from environment variables, so no credentials live in the code.
// Example: export DB_USER=myuser DB_PASSWORD=mypassword
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'registration'
});

// Fail early with a clear message if the database is unreachable
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Could not connect to the MySQL server:', err.message);
    process.exit(1);
  }
  console.log('Connected to the MySQL server');
  connection.release();
});

const app = express();

// Parse the form data sent by registration.html
app.use(express.urlencoded({ extended: true }));

// Handle the registration form submission
app.post('/reg.js', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Name, email and password are required');
  }

  try {
    // Hash the password before it is stored (never store plain text)
    const hashedPass = await bcrypt.hash(password, 10);

    // The UNIQUE constraint on Users.email (see schema.sql) is what prevents duplicates.
    // Relying on it avoids the race condition of "check first, insert later".
    const addUser = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
    pool.query(addUser, [name, email, hashedPass], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).send('Email already exists');
        }
        console.error(err);
        return res.status(500).send('Registration failed!');
      }

      console.log('User registered successfully');
      res.send('Registration successful!');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed!');
  }
});

// Start the server
const PORT = process.env.PORT || 44444;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
