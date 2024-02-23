import { BccLibraEsterlinaHandlerService } from '../bcc-libra-esterlina-handler.service';

describe('BccLibraEsterlinaHandlerService', () => {
  let bccHandlerService: BccLibraEsterlinaHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccLibraEsterlinaHandlerService();
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
