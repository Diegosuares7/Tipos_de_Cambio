import { AmosCode } from '../../enums/amos-code.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { handleProcessError } from '../../utiles/handle-process-error';
import { getParaguayWebScrapping } from './get-paraguay-gov-web-scrapping';

export class ParaguayGovDolarHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getParaguayWebScrapping(ExchangeRate.DOLAR);
      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.DOLAR,
          description: CountryCode.PARAGUAY,
          exchangeRate: value,
          exchangeBase: AmosCode.PARAGUAY,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'ParaguayGovDolarHandlerService');
    }
  }
}
