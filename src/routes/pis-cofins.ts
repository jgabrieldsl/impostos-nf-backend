import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { pisCofinService } from '../services/pis-service';
import { pisSchema } from '../schemas/pis-schema';

interface PisRequest {
  productValue: number;
  pisRate?: number;
  confinsRate?: number;
}

export async function pisCofinRoutes(app: FastifyInstance) {
  app.post<{ Body: PisRequest }>(
    '/IMPOSTOS/calcular-pis-confins',
    {
      schema: {
        body: pisSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              productValue: { type: 'string' },
              pisRate: { type: 'string' },
              pisAmount: { type: 'string' },
              confinsRate: { type: 'string' },
              confinsAmount: { type: 'string' },
              totalTax: { type: 'string' },
              total: { type: 'string' },
            },
          },
        },
      },
    },
    async (request: FastifyRequest<{ Body: PisRequest }>, reply: FastifyReply) => {
      const result = pisCofinService(request.body);
      return reply.send(result);
    }
  );
}