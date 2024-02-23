import { BccDolarObservadoHandlerService } from '../bcc-dolar-observado-handler.service';

describe('BccDolarObservadoHandlerService', () => {
  let bccHandlerService: BccDolarObservadoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccDolarObservadoHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bccHandlerService.getCurrencyData();
    expect(currencyData.currencyCode).toBeDefined();
    expect(currencyData.description).toBeDefined();
    expect(currencyData.exchangeRate).toBeDefined();
    expect(currencyData.exchangeBase).toBeDefined();
    expect(currencyData.validFrom).toBeDefined();
  });
});
