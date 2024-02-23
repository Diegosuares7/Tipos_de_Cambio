import axios from 'axios';
import { CurrencyHandler } from '../../interfaces/currency-handler.interface';
import { CurrencyProcess } from '../../interfaces/currency.interface';
import { ExchangeRate } from '../../enums/exchange-rate.enum';
import { getCurrentDate } from '../../utiles/get-date';
import { CountryCode } from '../../enums/country-code.enum';
import { AmosCode } from '../../enums/amos-code.enum';
import { handleProcessError } from '../../utiles/handle-process-error';

export class BrazilHandlerService implements CurrencyHandler {
  async getCurrencyData(): Promise<CurrencyProcess> {
    try {
      const CurrentDate = getCurrentDate();
      const url = `https://olinda.bcb.gov.br/olinda/service/PTAX/version/v1/odata/ExchangeRateDate(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda=%27${ExchangeRate.DOLAR}%27&@dataCotacao=%27${CurrentDate}%27&$top=101&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim`;
      const response = await axios.get(url);
      const date = new Date().toISOString().slice(0, 10);

      const usDollarSale = response.data?.value[0]?.cotacaoVenda.toString();

      return {
        success: true,
        currency: {
          currencyCode: ExchangeRate.DOLAR,
          description: CountryCode.BRASIL,
          exchangeRate: usDollarSale,
          exchangeBase: AmosCode.BRASIL,
          validFrom: date,
        },
      };
    } catch (error) {
      return handleProcessError(error.message, 'BrazilHandlerService');
    }
  }
}
