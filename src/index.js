// Require Express module
let express = require('express') 
// Require database connection
const db = require('./database/db');
const seedDB = require('./database/seedDB');


// Test database connection
db.query('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
    // Seed database
    seedDB.createAllTables()
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });





// Start new express app
let app = express()
const PORT = 8080


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  

//start server
app.listen(PORT, () => console.info('Server is running on port '))  