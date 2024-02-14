import { Currency } from '../interfaces/currency.interface';

export interface CurrencyHandler {
  getCurrencyData(): Promise<Currency>;
}
