import { CurrencyProcess } from '../interfaces/currency.interface';

export interface CurrencyHandler {
  getCurrencyData(): Promise<CurrencyProcess>;
}
