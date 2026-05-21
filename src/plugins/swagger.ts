import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export async function swaggerPlugin(app: FastifyInstance) {
  await app.register(fastifySwagger, {
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

  await app.register(fastifySwaggerUI, {
    routePrefix: "/docs",
  });
}
