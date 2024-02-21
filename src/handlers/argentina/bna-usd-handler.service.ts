import axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { Currency } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { validateEnvVariables } from '../../utiles/handler-utils';
import { ARGENTINA_BNA_USD } from '../../utiles/const-coin';
import 'dotenv/config';

export class BnaHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<Currency> {
    validateEnvVariables(['SALEPRICE']);
    const url = 'https://www.bna.com.ar/Personas';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let usDollar;
    const salePrice: boolean = process.env.SALEPRICE === 'true';
    if (salePrice) {
      const temp = $(ARGENTINA_BNA_USD).eq(0).next().next().text().trim();
      usDollar = temp;
    } else {
      const temp = $(ARGENTINA_BNA_USD).eq(0).next().text().trim();
      usDollar = temp;
    }

    const date = new Date().toISOString().slice(0, 10);

    return {
      currencyCode: ExchangeRate.DOLAR,
      description: CountryCode.ARGENTINA,
      exchangeRate: usDollar,
      exchangeBase: AmosCode.ARGENTINA,
      validFrom: date,
    };
  }
}
