import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { PERU_SBS_DOLAR_CANADIENSE } from '../../utiles/const-coins';
import { PERU_SBS_URL } from '../../utiles/const-url';
import { getWebScrapingDolarCanadiense } from './get-web-scraping';

export class SbsDolarCanadaHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getWebScrapingDolarCanadiense(PERU_SBS_URL, PERU_SBS_DOLAR_CANADIENSE);

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.DOLAR_CANADIENSE,
          description: CountryCode.PERU,
          exchangeRate: value,
          exchangeBase: AmosCode.DEFAULT,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'SbsDolarCanadaHandlerService');
    }
  }
}
