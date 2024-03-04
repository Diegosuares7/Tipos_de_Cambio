import { ParaguayGovPesoArgentinoHandlerService } from '../paraguay-gov-ars-api-handler.service';
import { ParaguayGovRealHandlerService } from '../paraguay-gov-brl-api-handler.service';
import { ParaguayGovDolarHandlerService } from '../paraguay-gov-dolar-api-handler.service';
import { ParaguayGovEuroHandlerService } from '../paraguay-gov-euro-api-handler.service';
import { ParaguayGovLibraHandlerService } from '../paraguay-gov-libra-api-handler.service';

describe('Web scrapping paraguay gov handler', () => {
  let arsCurrencyHandler: ParaguayGovPesoArgentinoHandlerService;
  let RealCurrencyHandler: ParaguayGovRealHandlerService;
  let euroCurrencyHandler: ParaguayGovEuroHandlerService;
  let libraCurrencyHandler: ParaguayGovLibraHandlerService;
  let dolarCurrencyHandelr: ParaguayGovDolarHandlerService;

  beforeEach(() => {
    arsCurrencyHandler = new ParaguayGovPesoArgentinoHandlerService();
    RealCurrencyHandler = new ParaguayGovRealHandlerService();
    euroCurrencyHandler = new ParaguayGovEuroHandlerService();
    libraCurrencyHandler = new ParaguayGovLibraHandlerService();
    dolarCurrencyHandelr = new ParaguayGovDolarHandlerService();
  });

  it('should return currency data for arg handler', async () => {
    const currencyData = await arsCurrencyHandler.getCurrencyData();
    const { currencyCode, description, exchangeRate, exchangeBase, validFrom } = currencyData.currency!;
    expect(currencyCode).toBeDefined();
    expect(currencyData).toBeDefined();
    expect(description).toBeDefined();
    expect(exchangeRate).toBeDefined();
    expect(exchangeBase).toBeDefined();
    expect(validFrom).toBeDefined();
  }, 10000);

  it('should return currency data for real handler', async () => {
    const currencyData = await RealCurrencyHandler.getCurrencyData();
    const { currencyCode, description, exchangeRate, exchangeBase, validFrom } = currencyData.currency!;
    expect(currencyCode).toBeDefined();
    expect(currencyData).toBeDefined();
    expect(description).toBeDefined();
    expect(exchangeRate).toBeDefined();
    expect(exchangeBase).toBeDefined();
    expect(validFrom).toBeDefined();
  }, 10000);

  it('should return currency data for euro handler', async () => {
    const currencyData = await euroCurrencyHandler.getCurrencyData();
    const { currencyCode, description, exchangeRate, exchangeBase, validFrom } = currencyData.currency!;
    expect(currencyCode).toBeDefined();
    expect(currencyData).toBeDefined();
    expect(description).toBeDefined();
    expect(exchangeRate).toBeDefined();
    expect(exchangeBase).toBeDefined();
    expect(validFrom).toBeDefined();
  }, 10000);

  it('should return currency data for libra handler', async () => {
    const currencyData = await libraCurrencyHandler.getCurrencyData();
    const { currencyCode, description, exchangeRate, exchangeBase, validFrom } = currencyData.currency!;
    expect(currencyCode).toBeDefined();
    expect(currencyData).toBeDefined();
    expect(description).toBeDefined();
    expect(exchangeRate).toBeDefined();
    expect(exchangeBase).toBeDefined();
    expect(validFrom).toBeDefined();
  }, 10000);

  it('should return currency data for dolar handler', async () => {
    const currencyData = await dolarCurrencyHandelr.getCurrencyData();
    const { currencyCode, description, exchangeRate, exchangeBase, validFrom } = currencyData.currency!;
    expect(currencyCode).toBeDefined();
    expect(currencyData).toBeDefined();
    expect(description).toBeDefined();
    expect(exchangeRate).toBeDefined();
    expect(exchangeBase).toBeDefined();
    expect(validFrom).toBeDefined();
  }, 10000);
});
