import { SbsPesoColombianoHandlerService } from '../sbs-peso-colombiano-handler.service';

describe('SbsPesoColombianoHandlerService', () => {
  let sbsPesoColombianoHandlerService: SbsPesoColombianoHandlerService;

  beforeEach(() => {
    sbsPesoColombianoHandlerService = new SbsPesoColombianoHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await sbsPesoColombianoHandlerService.getCurrencyData();

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
