const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the 'cors' package

const folderPath = 'images/'; // Replace with the actual folder path

const server = http.createServer((req, res) => {
  // Use the 'cors' middleware
  cors()(req, res, () => {
    if (req.url === '/') {
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        } else {
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        }
      });
    } else if (req.url === '/files') {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        } else {
          const fileNames = files.map(file => file);
          const jsonResponse = JSON.stringify(fileNames);
          res.setHeader('Content-Type', 'application/json');
          res.end(jsonResponse);
        }
      });
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });
});

const port = 5000; // Specify the desired port number
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
