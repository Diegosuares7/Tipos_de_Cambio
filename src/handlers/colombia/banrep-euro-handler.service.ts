import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { COLOMBIA_BANREP_EURO } from '../../utiles/const-coins';
import { COLOMBIA_BANREP_GENERAL } from '../../utiles/const-coins';
import { COLOMBIA_BANREP_URL } from '../../utiles/const-url';
import { COLOMBIA_BANREP_URL_COOKIE } from '../../utiles/const-url';
import { getWebScrapingGeneral } from './get-web-scraping';

export class BanrepEuroHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getWebScrapingGeneral(
        COLOMBIA_BANREP_URL,
        COLOMBIA_BANREP_URL_COOKIE,
        COLOMBIA_BANREP_EURO,
        COLOMBIA_BANREP_GENERAL,
      );

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.EURO,
          description: CountryCode.COLOMBIA,
          exchangeRate: value,
          exchangeBase: AmosCode.DEFAULT,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BanrepEuroHandlerService');
    }
  }
}
