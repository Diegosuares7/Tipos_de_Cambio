import { BccPesoColombianoHandlerService } from '../bcc-peso-colombiano-handler.service';

describe('BccPesoColombianoHandlerService', () => {
  let bccHandlerService: BccPesoColombianoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccPesoColombianoHandlerService();
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
