import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { BOLIVIA_BCB_URL } from '../../utiles/const-url';
import { BOLIVIA_BCB } from '../../utiles/const-coins';
import { getWebScraping } from './get-web-scraping';

export class BcbPesoColombianoHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getWebScraping(BOLIVIA_BCB_URL, BOLIVIA_BCB, ExchangeRate.PESO_COLOMBIANO);

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.PESO_COLOMBIANO,
          description: CountryCode.BOLIVIA,
          exchangeRate: value,
          exchangeBase: AmosCode.DEFAULT,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BcbPesoColombianoHandlerService');
    }
  }
}
