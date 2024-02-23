import { BccRealBrasilenioHandlerService } from '../bcc-real-brasilenio-handler.service';

describe('BccRealBrasilenioHandlerService', () => {
  let bccHandlerService: BccRealBrasilenioHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccRealBrasilenioHandlerService();
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
