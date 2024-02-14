import { BnaHandlerService } from './bna-handler.service';

describe('BnaHandlerService', () => {
  let bnaHandlerService: BnaHandlerService;

  beforeEach(() => {
    bnaHandlerService = new BnaHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bnaHandlerService.getCurrencyData();
    expect(currencyData.date).toBeDefined();
    expect(currencyData.currency).toBeDefined();
    expect(currencyData.currencyTo).toBeDefined();
    expect(currencyData.purchaseValue).toBeDefined();
    expect(currencyData.saleValue).toBeDefined();
  });
});
