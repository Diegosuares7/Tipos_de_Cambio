import { BccSolPeruanoHandlerService } from '../bcc-sol-peruano-handler.service';

describe('BccSolPeruanoHandlerService', () => {
  let bccHandlerService: BccSolPeruanoHandlerService;

  beforeEach(() => {
    bccHandlerService = new BccSolPeruanoHandlerService();
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
