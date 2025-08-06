const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo');

// Configuração do servidor Express
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use('/api/todo', todoRoutes);

// Rota raiz
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});