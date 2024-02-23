import { BccDolarCanadienseHandlerService } from '../bcc-dolar-canadiense-handler.service';

describe('BccDolarCanadienseHandlerService', () => {
  let bccHandlerService: BccDolarCanadienseHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccDolarCanadienseHandlerService();
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
