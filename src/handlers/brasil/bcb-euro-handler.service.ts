import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { BRASIL_BCB, BRASIL_BCB_EURO } from '../../utiles/const-coins';
import { BRASIL_BCB_URL } from '../../utiles/const-url';
import { getWebScraping } from './get-web-scraping';

export class BcbEuroHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getWebScraping(BRASIL_BCB_URL, BRASIL_BCB, BRASIL_BCB_EURO);
      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.EURO,
          description: CountryCode.BRASIL,
          exchangeRate: value,
          exchangeBase: AmosCode.DEFAULT,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BcbEuroHandlerService');
    }
  }
}
