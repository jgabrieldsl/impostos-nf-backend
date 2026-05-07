// Endpoint de health check. Ex: GET /INFP/health
import { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    return {
      status: "ok",
    };
  });
}