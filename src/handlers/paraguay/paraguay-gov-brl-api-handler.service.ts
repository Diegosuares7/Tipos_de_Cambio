import { CurrencyProcess } from '../../interfaces/currency.interface';
import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { getParaguayWebScrapping } from './get-paraguay-gov-web-scrapping';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';

export class ParaguayGovRealHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getParaguayWebScrapping(ExchangeRate.REAL_BRASILENO);
      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.REAL_BRASILENO,
          description: CountryCode.PARAGUAY,
          exchangeRate: value,
          exchangeBase: AmosCode.PARAGUAY,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'ParaguayGovRealHandlerService');
    }
  }
}
