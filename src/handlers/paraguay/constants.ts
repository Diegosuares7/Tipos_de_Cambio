import { ExchangeRate } from '../../enums/exchange-rate.enum';

export const PARAGUAY_HANDLER_CONSTANTS = {
  PARAGUAY_WEB_SCRAPPING_URL: 'https://www.set.gov.py/web/portal-institucional/cotizaciones',
  SELECTOR_TITULOS: '.section__midtitle',
  SELECTOR_TABLAS: '.table',
  DOLAR_COMPRA_INDEX: 0,
};

export const COLUMN_INDEX_CURRENCY: Partial<Record<ExchangeRate, number>> = {
  [ExchangeRate.DOLAR]: 1,
  [ExchangeRate.REAL_BRASILENO]: 3,
  [ExchangeRate.PESO_ARGENTINO]: 5,
  [ExchangeRate.EURO]: 9,
  [ExchangeRate.LIBRA_ESTERLINA]: 11,
};
