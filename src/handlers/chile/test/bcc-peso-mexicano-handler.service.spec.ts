import { BccPesoMexicanoHandlerService } from '../bcc-peso-mexicano-handler.service';

describe('BccPesoMexicanoHandlerService', () => {
  let bccHandlerService: BccPesoMexicanoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccPesoMexicanoHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await bccHandlerService.getCurrencyData();
    expect(currencyData.currencyCode).toBeDefined();
    expect(currencyData.description).toBeDefined();
    expect(currencyData.exchangeRate).toBeDefined();
    expect(currencyData.exchangeBase).toBeDefined();
    expect(currencyData.validFrom).toBeDefined();
  });
});
