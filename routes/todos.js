const todosSchema = require('../schemas/todos');
const {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todos');

const createTodoOpts = {
  schema: {
    body: todosSchema.todoInput,
    response: {
      200: todosSchema.todoItem
    }
  },
  handler: createTodo
};

const getTodosOpts = {
  schema: {
    response: {
      200: todosSchema.todosArray
    }
  },
  handler: getTodos
};

const getTodoOpts = {
  schema: {
    params: todosSchema.todoId,
    response: {
      200: todosSchema.todoItem
    }
  },
  handler: getTodo
};

const updateTodoOpts = {
  schema: {
    params: todosSchema.todoId,
    response: {
      200: todosSchema.todoId
    }
  },
  handler: updateTodo
};

const deleteTodoOpts = {
  schema: {
    params: todosSchema.todoId,
    response: {
      200: todosSchema.todoId
    }
  },
  handler: deleteTodo
};

module.exports = function todoRoutes(app, opts, done) {
  app.post('/todos', createTodoOpts);

  app.get('/todos', getTodosOpts);

  app.get('/todos/:id', getTodoOpts);

  app.put('/todos/:id', updateTodoOpts);

  app.delete('/todos/:id', deleteTodoOpts);

  done();
};
