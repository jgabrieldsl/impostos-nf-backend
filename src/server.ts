// Ponto de entrada da aplicação. Responsável apenas por iniciar o servidor HTTP.

import Fastify from "fastify";
import { env } from "./env";
import { healthRoutes } from "./routes/health";
import { pisCofinRoutes } from './routes/pis-cofins';

const app = Fastify({
  logger: true,
});

app.register(healthRoutes);
app.register(pisCofinRoutes);
app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`HTTP Server Running on ${env.PORT} 🚀`);
});