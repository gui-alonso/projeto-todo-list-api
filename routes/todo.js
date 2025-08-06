const express=  require('express');
const router = express.Router();

// Array em memória para armazenar as tarefas
let todos = []; // Inicializa o array de tarefas
let nextId = 1; // Inicializa o ID da próxima tarefa

// GET - Retorna todas as tarefas
router.get('/', (req, res) => {
  res.json(todos);
});

// GET - obter tarefa por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Converte o ID para um número inteiro
    const todo = todos.find(t => t.id === id); // Busca a tarefa pelo ID

    // Se a tarefa não for encontrada, retorna 404
    if (!todo) return res.status(404).json ({ error: 'Tarefa não encontrada'});
    res.json(todo);
});

// POST - cria uma nova tarefa
router.post('/', (req, res) => {
const { title } = req.body; // Extrai o título do corpo da requisição

if (!title) return res.status(400).json({ error: 'Título é obrigatório' }); // Verifica se o título foi fornecido

// refere-se como se fossem as colunas no BD
const newTodo = {
    id: nextId++, // Atribui o próximo ID e incrementa para a próxima tarefa
    title,
    completed: false // sendo verdadeiro (true) ou falso (false), indicam apenas dois retornos.
}

    todos.push(newTodo);
    res.status(201).json(newTodo); // Retorna a nova tarefa criada com status 201
    // retorna como => "tarefa cadastrada com sucesso"
});

// PUT - atualizar uma tarefa
router.put('/:id', (req, res) => {
   const id = parseInt(req.params.id); // Converte o ID para um número inteiro
   const { title, completed } = req.body; // Extrai o título e o status de conclusão do corpo da requisição

   const todo = todos.find(t => t.id === id); // Busca a tarefa pelo ID
   if (!todo) return res.status(404).json({ error: 'Tarefa não encontrada' }); // Se a tarefa não for encontrada, retorna 404

   if (title !== undefined) todo.title = title; // Atualiza o título se fornecido
   if (completed !== undefined) todo.completed = completed; // Atualiza o status de conclusão
   res.json(todo); // Retorna a tarefa atualizada
});


// DELETE - apagar uma tarefa
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Converte o ID para um número inteiro
    const index = todos.findIndex(t => t.id === id); // Busca o índice da tarefa pelo ID

    if (index === -1) return res.status(404).json({ error: 'Tarefa não encontrada' }); // Se a tarefa não for encontrada, retorna 404

    todos.splice(index, 1); // Remove a tarefa do array
    res.status(204).send(); // Retorna 204 No Content
});

module.exports = router; // Exporta o router para ser usado no app.js