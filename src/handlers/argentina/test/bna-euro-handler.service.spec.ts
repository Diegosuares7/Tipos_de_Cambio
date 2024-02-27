import { BnaEuroHandlerService } from '../bna-euro-handler.service';

describe('BnaEuroHandlerService', () => {
  let bnaEuroHandlerService: BnaEuroHandlerService;

  beforeEach(() => {
    bnaEuroHandlerService = new BnaEuroHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bnaEuroHandlerService.getCurrencyData();

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
