import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';

import { pisCofinRoutes } from './routes/pis-cofins';

const app = Fastify({
  logger: true,
});

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Tax Calculator API',
      version: '1.0.0',
      description: 'API para cálculo de impostos fiscais',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development',
      },
    ],
  },
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});

app.register(pisCofinRoutes);

const PORT = 3333;
app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/docs`);
});

export default app;