import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { Currency } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { CHILE_BCC_LIBRA_ESTERLINA } from '../../utiles/const-coins';
import { CHILE_BCC_URL_SECONDARY } from '../../utiles/const-url';
import { getViaWebScraping } from '../../utiles/get-via-web-scraping';

export class BccLibraEsterlinaHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<Currency> {
    const { value, date } = await getViaWebScraping(CHILE_BCC_URL_SECONDARY, CHILE_BCC_LIBRA_ESTERLINA);

    return {
      currencyCode: ExchangeRate.LIBRA_ESTERLINA,
      description: CountryCode.CHILE,
      exchangeRate: value,
      exchangeBase: AmosCode.CHILE,
      validFrom: date,
    };
  }
}
