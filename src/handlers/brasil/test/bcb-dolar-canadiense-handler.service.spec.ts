import { BcbDolarHandlerService } from '../bcb-dolar-handler.service';

describe('BcbDolarHandlerService', () => {
  let bcbDolarHandlerService: BcbDolarHandlerService;

  beforeEach(() => {
    bcbDolarHandlerService = new BcbDolarHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bcbDolarHandlerService.getCurrencyData();

    expect(currencyData.success).toBe(true);
    expect(currencyData.currency).toBeDefined();

    if (currencyData.currency) {
      const { currencyCode, description, exchangeRate, exchangeBase, validFrom } = currencyData.currency;

      expect(currencyCode).toBeDefined();
      expect(description).toBeDefined();
      expect(exchangeRate).toBeDefined();
      expect(exchangeBase).toBeDefined();
      expect(validFrom).toBeDefined();
    } else {
      fail('Currency data should be defined when success is true.');
    }
  });
});
