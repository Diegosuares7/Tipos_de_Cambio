import axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';

export class BnaHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const url = 'https://www.bna.com.ar/Personas';
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const usDollarSale = $('td.tit:contains("Dolar U.S.A")').eq(0).next().next().text().trim();

      const date = new Date().toISOString().slice(0, 10);

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.DOLAR,
          description: CountryCode.ARGENTINA,
          exchangeRate: usDollarSale,
          exchangeBase: AmosCode.ARGENTINA,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BnaHandlerService');
    }
  }
}
