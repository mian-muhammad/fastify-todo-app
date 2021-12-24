const createTodo = async function (request, reply) {
  const todosCollection = this.mongo.db.collection('todos');
  const result = await todosCollection.insertOne(request.body);
  reply.code(201);
  return { id: result.insertedId };
};

const getTodos = async function (request, reply) {
  const todosCollection = this.mongo.db.collection('todos');
  const docs = await todosCollection.find().toArray();

  return docs.map((doc) => {
    doc.id = doc._id.toString();
    return doc;
  });
};

const getTodo = async function (request, reply) {
  const todosCollection = this.mongo.db.collection('todos');
  const todo = await todosCollection.findOne({
    _id: this.mongo.ObjectId(request.params.id)
  });

  if (todo === null) {
    const error = new Error('Object not found', request.params.id);
    error.status = 404;
    throw error;
  }

  todo.id = todo._id.toString();

  return todo;
};

const updateTodo = async function (request, reply) {
  const todosCollection = this.mongo.db.collection('todos');
  const result = await todosCollection.updateOne(
    {
      _id: this.mongo.ObjectId(request.params.id)
    },
    {
      $set: {
        done: request.body.done,
        doneAt: request.body.done ? new Date() : null
      }
    }
  );

  if (result.matchedCount === 0) {
    const error = new Error('Object not found: ', request.params.id);
    error.status = 404;
    throw error;
  }

  return { id: request.params.id };
};

const deleteTodo = async function (request, reply) {
  const todosCollection = this.mongo.db.collection('todos');
  const result = await todosCollection.deleteOne({
    _id: this.mongo.ObjectId(request.params.id)
  });

  if (result.deletedCount === 0) {
    const error = new Error('Object not found: ', request.params.id);
    error.status = 404;
    throw error;
  }

  return { id: request.params.id };
};

module.exports = { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
