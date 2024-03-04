import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';
import { getExchangeRate } from './get-web-scraping-irlanda';

export class EcbRealBrasilenioHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getExchangeRate(ExchangeRate.REAL_BRASILENO);

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.REAL_BRASILENO,
          description: CountryCode.IRLANDA,
          exchangeRate: value,
          exchangeBase: AmosCode.IRLANDA,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'EcbRealBrasilenioHandlerService');
    }
  }
}
