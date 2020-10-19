const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, function () {
  console.log(`server on port: ${port}!`);
});