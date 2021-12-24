module.exports = {
  todoInput: {
    type: 'object',
    additionalProperties: false,
    properties: {
      text: { type: 'string', minLength: 1, maxLength: 80 },
      done: { type: 'boolean', default: false }
    },
    required: ['text']
  },

  todoUpdate: {
    type: 'object',
    additionalProperties: false,
    properties: {
      done: { type: 'boolean', default: false }
    }
  },

  todoId: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 24, maxLength: 24 }
    }
  },

  todosArray: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: { type: 'string' },
        text: { type: 'string' },
        done: { type: 'boolean' }
        // doneAt: { type: 'date-time' }
      }
    }
  },

  todoItem: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: { type: 'string' },
      text: { type: 'string' },
      done: { type: 'boolean' }
      // doneAt: { type: 'date-time' }
    }
  }
};
