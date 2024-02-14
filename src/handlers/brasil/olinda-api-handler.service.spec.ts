import { BrazilHandlerService } from './olinda-api-handler.service';

describe('BrazilHandlerService', () => {
  let brazilHandlerService: BrazilHandlerService;

  beforeEach(() => {
    brazilHandlerService = new BrazilHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await brazilHandlerService.getCurrencyData();

    expect(currencyData.date).toBeDefined();
    expect(currencyData.currency).toBeDefined();
    expect(currencyData.currencyTo).toBeDefined();
    expect(currencyData.purchaseValue).toBeDefined();
    expect(currencyData.saleValue).toBeDefined();
  });
});
