import { describe, expect, it } from "vitest";

import { buildApp } from "../app";
import { ipiService } from "../services/ipi-service";

describe("IPI Service", () => {
  it("calcula IPI corretamente sobre o valor do produto", () => {
    const result = ipiService({ productValue: 100, ipiRate: 0.05 });

    expect(parseFloat(result.ipiAmount)).toBeCloseTo(5);
    expect(parseFloat(result.total)).toBeCloseTo(105);
    expect(result.ipiRate).toBe("5.00%");
  });

  it("rejeita aliquota fora do intervalo permitido", () => {
    expect(() => ipiService({ productValue: 100, ipiRate: 1.5 })).toThrow(
      "ipiRate deve estar entre 0 e 1",
    );
  });
});

describe("POST /ipi", () => {
  it("retorna o calculo do IPI", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/ipi",
      payload: {
        productValue: 200,
        ipiRate: 0.1,
      },
    });

    await app.close();

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      productValue: "200.00",
      ipiRate: "10.00%",
      ipiAmount: "20.00",
      total: "220.00",
    });
  });

  it("retorna 400 para payload invalido", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/ipi",
      payload: {
        productValue: 100,
        ipiRate: 2,
      },
    });

    await app.close();

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({
      message: "body/ipiRate must be <= 1",
    });
  });

  it("retorna 400 quando campos obrigatorios nao sao enviados", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/ipi",
      payload: {
        productValue: 100,
      },
    });

    await app.close();

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({
      message: "body must have required property 'ipiRate'",
    });
  });
});
