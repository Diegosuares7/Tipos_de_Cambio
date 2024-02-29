import { SbsRealBrasilHandlerService } from '../sbs-real-brasil-handler.service';

describe('SbsRealBrasilHandlerService', () => {
  let sbsRealBrasilHandlerService: SbsRealBrasilHandlerService;

  beforeEach(() => {
    sbsRealBrasilHandlerService = new SbsRealBrasilHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await sbsRealBrasilHandlerService.getCurrencyData();

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
