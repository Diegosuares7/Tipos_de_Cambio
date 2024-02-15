import axios from 'axios';
import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { Currency } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { getCurrentDate } from '../../utiles/get-date';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';

export class BrazilHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<Currency> {
    const CurrentDate = getCurrentDate();
    const url = `https://olinda.bcb.gov.br/olinda/service/PTAX/version/v1/odata/ExchangeRateDate(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda=%27${ExchangeRate.DOLAR}%27&@dataCotacao=%27${CurrentDate}%27&$top=101&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim`;
    const response = await axios.get(url);
    const date = new Date().toISOString().slice(0, 10);

    //const usDollarBuy = response.data?.value[0]?.cotacaoCompra.toString();
    const usDollarSale = response.data?.value[0]?.cotacaoVenda.toString();
    return {
      currencyCode: ExchangeRate.DOLAR,
      description: CountryCode.BRASIL,
      exchangeRate: usDollarSale,
      exchangeBase: AmosCode.BRASIL,
      validFrom: date,
    };
  }
}
