import { BccPesoUruguayoHandlerService } from '../bcc-peso-uruguayo-handler.service';

describe('BccPesoUruguayoHandlerService', () => {
  let bccHandlerService: BccPesoUruguayoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccPesoUruguayoHandlerService();
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
