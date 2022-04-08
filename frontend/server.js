const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/sample-app'));

app.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, '/dist/sample-app/index.html'));
});

app.listen(process.env.PORT || 8080);