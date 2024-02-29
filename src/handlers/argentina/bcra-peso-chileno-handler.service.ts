import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { ARGENTINA_BCRA_PESO_CHILENO } from '../../utiles/const-coins';
import { ARGENTINA_BCRA_URL } from '../../utiles/const-url';
import { getWebScraping } from './get-web-scraping';

export class BcraPesoChileHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getWebScraping(ARGENTINA_BCRA_URL, ARGENTINA_BCRA_PESO_CHILENO);
      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.PESO_CHILENO,
          description: CountryCode.ARGENTINA,
          exchangeRate: value,
          exchangeBase: AmosCode.ARGENTINA,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BcraPesoChileHandlerService');
    }
  }
}
