import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { ARGENTINA_BNA_URL } from '../../utiles/const-url';
import { ARGENTINA_BNA_EURO } from '../../utiles/const-coins';
import { getViaWebScraping } from '../../utiles/get-via-web-scraping';

export class BnaEuroHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getViaWebScraping(ARGENTINA_BNA_URL, ARGENTINA_BNA_EURO);
      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.EURO,
          description: CountryCode.ARGENTINA,
          exchangeRate: value,
          exchangeBase: AmosCode.DEFAULT,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BnaEuroHandlerService');
    }
  }
}
