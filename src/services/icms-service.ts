import { icmsCalculationSchema } from '../schemas/icms-schema';

type StateCode =
  | 'AC'
  | 'AL'
  | 'AP'
  | 'AM'
  | 'BA'
  | 'CE'
  | 'DF'
  | 'ES'
  | 'GO'
  | 'MA'
  | 'MT'
  | 'MS'
  | 'MG'
  | 'PA'
  | 'PB'
  | 'PR'
  | 'PE'
  | 'PI'
  | 'RJ'
  | 'RN'
  | 'RS'
  | 'RO'
  | 'RR'
  | 'SC'
  | 'SP'
  | 'SE'
  | 'TO';

interface IcmsCalculationResponse {
  productValue: string;
  state: StateCode;
  icmsRate: string;
  icmsAmount: string;
  total: string;
}

export const ICMS_RATES_BY_STATE: Record<StateCode, number> = {
  AC: 0.19,
  AL: 0.2,
  AP: 0.18,
  AM: 0.2,
  BA: 0.205,
  CE: 0.2,
  DF: 0.2,
  ES: 0.17,
  GO: 0.19,
  MA: 0.22,
  MT: 0.17,
  MS: 0.17,
  MG: 0.18,
  PA: 0.19,
  PB: 0.2,
  PR: 0.195,
  PE: 0.205,
  PI: 0.21,
  RJ: 0.22,
  RN: 0.18,
  RS: 0.17,
  RO: 0.195,
  RR: 0.2,
  SC: 0.17,
  SP: 0.18,
  SE: 0.19,
  TO: 0.2,
};

export function icmsService(payload: unknown): IcmsCalculationResponse {
  const { productValue, state } = icmsCalculationSchema.parse(payload);
  const icmsRate = ICMS_RATES_BY_STATE[state as StateCode];

  if (icmsRate === undefined) {
    throw new Error('state deve ser uma UF brasileira valida');
  }

  const icmsAmount = productValue * icmsRate;
  const total = productValue + icmsAmount;

  return {
    productValue: productValue.toFixed(2),
    state: state as StateCode,
    icmsRate: `${(icmsRate * 100).toFixed(2)}%`,
    icmsAmount: icmsAmount.toFixed(2),
    total: total.toFixed(2),
  };
}
