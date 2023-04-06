const express = require('express');
require('express-async-errors');
const routers = require('./routers');
const errorHandler = require('./middlewares/errorHandler');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.use(routers);

app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
