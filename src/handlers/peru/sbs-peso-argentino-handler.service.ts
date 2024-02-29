import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { PERU_SBS_PESO_ARGENTINO } from '../../utiles/const-coins';
import { PERU_SBS_URL_CONTABLE } from '../../utiles/const-url';
import { getWebScrapingDolarCanadiense } from './get-web-scraping';

export class SbsPesoArgentinoHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getWebScrapingDolarCanadiense(PERU_SBS_URL_CONTABLE, PERU_SBS_PESO_ARGENTINO);

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.PESO_ARGENTINO,
          description: CountryCode.PERU,
          exchangeRate: value,
          exchangeBase: AmosCode.DEFAULT,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'SbsPesoArgentinoHandlerService');
    }
  }
}
