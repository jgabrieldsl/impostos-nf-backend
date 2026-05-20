import type { IpiCalculationInput } from "../schemas/ipi-schema";

interface IpiCalculationResponse {
  productValue: string;
  ipiRate: string;
  ipiAmount: string;
  total: string;
}

export function ipiService(
  payload: IpiCalculationInput,
): IpiCalculationResponse {
  const { productValue, ipiRate } = payload;

  if (productValue <= 0) {
    throw new Error("productValue deve ser maior que zero");
  }

  if (ipiRate < 0 || ipiRate > 1) {
    throw new Error("ipiRate deve estar entre 0 e 1");
  }

  const ipiAmount = productValue * ipiRate;
  const total = productValue + ipiAmount;

  return {
    productValue: productValue.toFixed(2),
    ipiRate: `${(ipiRate * 100).toFixed(2)}%`,
    ipiAmount: ipiAmount.toFixed(2),
    total: total.toFixed(2),
  };
}
