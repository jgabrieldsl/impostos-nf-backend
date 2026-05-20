import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import Fastify from "fastify";

import { icmsRoutes } from "./routes/icms";
import { ipiRoutes } from "./routes/ipi";
import { pisCofinRoutes } from "./routes/pis-cofins";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(fastifyCors);

  app.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Tax Calculator API",
        version: "1.0.0",
        description: "API para calculo de impostos fiscais",
      },
      servers: [
        {
          url: "http://localhost:3333",
          description: "Development",
        },
      ],
    },
  });

  app.register(fastifySwaggerUI, {
    routePrefix: "/docs",
  });

  app.register(ipiRoutes);
  app.register(pisCofinRoutes);
  app.register(icmsRoutes);

  return app;
}
