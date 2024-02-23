import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { CHILE_BCC_DOLAR_OBSERVADO } from '../../utiles/const-coins';
import { CHILE_BCC_URL_PRINCIPAL } from '../../utiles/const-url';
import { getViaWebScraping } from '../../utiles/get-via-web-scraping';
import { handleProcessError } from '../../utiles/handle-process-error';

export class BccDolarObservadoHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const { value, date } = await getViaWebScraping(CHILE_BCC_URL_PRINCIPAL, CHILE_BCC_DOLAR_OBSERVADO);

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.DOLAR,
          description: CountryCode.CHILE,
          exchangeRate: value,
          exchangeBase: AmosCode.CHILE,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BccDolarObservadoHandlerService');
    }
  }
}
