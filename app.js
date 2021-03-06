module.exports = async function application(app, opts) {
  await app.register(require('fastify-env'), {
    schema: {
      type: 'object',
      properties: {
        PORT: { type: 'integer', default: 3000 },
        NODE_ENV: { type: 'string' },
        MONGO_URL: { type: 'string' }
      }
    }
  });

  app.register(require('fastify-mongodb'), {
    url: app.config.MONGO_URL
  });

  app.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: { info: { title: true } }
  });

  app.register(require('./routes/todos'));
};
