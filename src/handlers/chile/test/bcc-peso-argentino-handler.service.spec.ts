import { BccPesoArgentinoHandlerService } from '../bcc-peso-argentino-handler.service';

describe('BccPesoArgentinoHandlerService', () => {
  let bccHandlerService: BccPesoArgentinoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccPesoArgentinoHandlerService();
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
