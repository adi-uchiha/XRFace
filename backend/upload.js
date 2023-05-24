const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Enable CORS for all routes
app.use(cors());

// Set 'Access-Control-Allow-Headers' response header to '*'
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


// Middleware to parse JSON in the request body
app.use(express.json());

app.post('/uploadUser', (req, res) => {
  const userData = req.body; // Assuming the request body contains the user data in JSON format

  // Check if user data is empty
  if (Object.keys(userData).length === 0) {
    return res.status(400).send('User data is empty');
  }

  // Generate a unique filename for the JSON file
  const fileName = userData.FristName;
  const secondName = userData.SecondName;
  const filePath = `./users/${fileName}-${secondName}.json`;

  // Write the user data to a JSON file
  fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing file');
    }
    console.log(`File ${filePath} created successfully.`);
    res.status(200).send('File created successfully.');
  });
});

app.get('/getUser/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `./users/${fileName}.json`;

  // Read the file asynchronously
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading file');
    }

    let user;

    try {
      user = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error parsing JSON file');
    }

    res.json(user);
  });
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
