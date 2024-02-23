import { BccGuaraniParaguayoHandlerService } from '../bcc-guarani-paraguayo-handler.service';

describe('BccGuaraniParaguayoHandlerService', () => {
  let bccHandlerService: BccGuaraniParaguayoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccGuaraniParaguayoHandlerService();
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
