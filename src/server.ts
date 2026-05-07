import Fastify from "fastify";

import { env } from "./env";
import { healthRoutes } from "./routes/health";

const app = Fastify({
  logger: true,
});

app.register(healthRoutes);

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`HTTP Server Running on ${env.PORT} 🚀`);
});