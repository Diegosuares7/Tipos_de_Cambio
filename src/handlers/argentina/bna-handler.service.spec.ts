import { BnaHandlerService } from './bna-usd-handler.service';

describe('BnaHandlerService', () => {
  let bnaHandlerService: BnaHandlerService;

  beforeEach(() => {
    bnaHandlerService = new BnaHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bnaHandlerService.getCurrencyData();
    expect(currencyData.currencyCode).toBeDefined();
    expect(currencyData.description).toBeDefined();
    expect(currencyData.exchangeRate).toBeDefined();
    expect(currencyData.exchangeBase).toBeDefined();
    expect(currencyData.validFrom).toBeDefined();
  });
});
