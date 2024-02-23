import { BccEuroHandlerService } from '../bcc-euro-handler.service';

describe('BccEuroHandlerService', () => {
  let bccHandlerService: BccEuroHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccEuroHandlerService();
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
