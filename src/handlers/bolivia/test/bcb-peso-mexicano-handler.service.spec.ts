import { BcbPesoMexicanoHandlerService } from '../bcb-peso-mexicano-handler.service';

describe('BcbPesoMexicanoHandlerService', () => {
  let bcbPesoMexicanoHandlerService: BcbPesoMexicanoHandlerService;

  beforeEach(() => {
    bcbPesoMexicanoHandlerService = new BcbPesoMexicanoHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bcbPesoMexicanoHandlerService.getCurrencyData();

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
