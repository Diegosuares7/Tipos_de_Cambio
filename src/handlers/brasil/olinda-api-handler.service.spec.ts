import { BrazilHandlerService } from './olinda-api-handler.service';

describe('BrazilHandlerService', () => {
  let brazilHandlerService: BrazilHandlerService;

  beforeEach(() => {
    brazilHandlerService = new BrazilHandlerService();
  });

  it('should return currency data', async () => {
    const currencyData = await brazilHandlerService.getCurrencyData();

    expect(currencyData.currencyCode).toBeDefined();
    expect(currencyData.description).toBeDefined();
    expect(currencyData.exchangeRate).toBeDefined();
    expect(currencyData.exchangeBase).toBeDefined();
    expect(currencyData.validFrom).toBeDefined();
  });
});
