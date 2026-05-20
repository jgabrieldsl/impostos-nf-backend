import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import {
  type IpiCalculationInput,
  ipiCalculationSchema,
} from "../schemas/ipi-schema";
import { ipiService } from "../services/ipi-service";

export async function ipiRoutes(app: FastifyInstance) {
  app.post<{ Body: IpiCalculationInput }>(
    "/ipi",
    {
      attachValidation: true,
      schema: {
        body: {
          type: "object",
          required: ["productValue", "ipiRate"],
          properties: {
            productValue: {
              type: "number",
              description: "Valor do produto em reais",
            },
            ipiRate: {
              type: "number",
              minimum: 0,
              maximum: 1,
              description: "Aliquota de IPI em decimal. Ex: 0.05 para 5%",
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              productValue: { type: "string" },
              ipiRate: { type: "string" },
              ipiAmount: { type: "string" },
              total: { type: "string" },
            },
          },
          400: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: IpiCalculationInput }>,
      reply: FastifyReply,
    ) => {
      if (request.validationError) {
        return reply.code(400).send({
          message: request.validationError.message,
        });
      }

      try {
        const payload = ipiCalculationSchema.parse(request.body);
        const result = ipiService(payload);

        return reply.send(result);
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.code(400).send({
            message: error.issues[0]?.message ?? "Payload invalido",
          });
        }

        if (error instanceof Error) {
          return reply.code(400).send({ message: error.message });
        }

        return reply.code(400).send({ message: "Payload invalido" });
      }
    },
  );
}
