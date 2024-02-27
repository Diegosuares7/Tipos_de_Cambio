import { BnaDolarHandlerService } from '../bna-dolar-handler.service';

describe('BnaDolarHandlerService', () => {
  let bnaDolarHandlerService: BnaDolarHandlerService;

  beforeEach(() => {
    bnaDolarHandlerService = new BnaDolarHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bnaDolarHandlerService.getCurrencyData();

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
