import { BccSolPeruanoHandlerService } from '../bcc-sol-peruano-handler.service';

describe('BccSolPeruanoHandlerService', () => {
  let bccHandlerService: BccSolPeruanoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccSolPeruanoHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bccHandlerService.getCurrencyData();

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
