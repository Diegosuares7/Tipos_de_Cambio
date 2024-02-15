import * as convert from 'xml-js';

export function parseCurrencysToXml(currencyData): string {
  return convert.js2xml(
    {
      _declaration: {
        _attributes: {
          version: '1.0',
          encoding: 'UTF-8',
        },
      },
      importCurrency: {
        _attributes: {
          version: '0.2',
        },
        currency: currencyData,
      },
    },
    { compact: true, spaces: 2 },
  );
}
