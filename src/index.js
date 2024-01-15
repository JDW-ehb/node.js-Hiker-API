// Require Express module
let express = require('express') 

// Start new express app
let app = express()
const PORT = 8080


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  

//start server
app.listen(PORT, () => console.info('Server is running on port ${PORT}'))  