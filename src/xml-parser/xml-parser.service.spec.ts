import { parseCurrencysToXml } from './xml-parser';

describe('parseCurrencysToXml', () => {
  it('should convert currency data to XML', () => {
    const currencyData = [
      {
        currencyCode: 'USD',
        description: 'AR',
        exchangeRate: '856,5000',
        exchangeBase: 1,
        validFrom: '2024-02-22',
      },
      {
        currencyCode: 'USD',
        description: 'AR',
        exchangeRate: '856,5000',
        exchangeBase: 1,
        validFrom: '2024-02-22',
      },
    ];

    const expectedXml = `<?xml version="1.0" encoding="UTF-8"?>
<importCurrency version="0.2">
  <currency>
    <currencyCode>USD</currencyCode>
    <description>AR</description>
    <exchangeRate>856,5000</exchangeRate>
    <exchangeBase>1</exchangeBase>
    <validFrom>2024-02-22</validFrom>
  </currency>
  <currency>
    <currencyCode>USD</currencyCode>
    <description>AR</description>
    <exchangeRate>856,5000</exchangeRate>
    <exchangeBase>1</exchangeBase>
    <validFrom>2024-02-22</validFrom>
  </currency>
</importCurrency>`;

    const result = parseCurrencysToXml(currencyData);
    expect(result).toEqual(expectedXml);
  });

  it('should handle empty currency data array', () => {
    const currencyData = [];

    const expectedXml = `<?xml version="1.0" encoding="UTF-8"?>
<importCurrency version="0.2">
</importCurrency>`;

    const result = parseCurrencysToXml(currencyData);
    expect(result).toEqual(expectedXml);
  });

  it('should handle null currency data', () => {
    const currencyData = null;
    const expectedXml = `<?xml version="1.0" encoding="UTF-8"?>
<importCurrency version="0.2">
  <currency/>
</importCurrency>`;

    const result = parseCurrencysToXml(currencyData);
    expect(result).toEqual(expectedXml);
  });

  it('should handle single currency data', () => {
    const currencyData = [
      {
        currencyCode: 'USD',
        description: 'AR',
        exchangeRate: '856,5000',
        exchangeBase: 1,
        validFrom: '2024-02-22',
      },
    ];
    const expectedXml = `<?xml version="1.0" encoding="UTF-8"?>
<importCurrency version="0.2">
  <currency>
    <currencyCode>USD</currencyCode>
    <description>AR</description>
    <exchangeRate>856,5000</exchangeRate>
    <exchangeBase>1</exchangeBase>
    <validFrom>2024-02-22</validFrom>
  </currency>
</importCurrency>`;

    const result = parseCurrencysToXml(currencyData);
    expect(result).toEqual(expectedXml);
  });

  it('should handle multiple currencies', () => {
    const currencyData = [
      {
        currencyCode: 'USD',
        description: 'AR',
        exchangeRate: '856,5000',
        exchangeBase: 1,
        validFrom: '2024-02-22',
      },
      {
        currencyCode: 'EUR',
        description: 'EU',
        exchangeRate: '1.1122',
        exchangeBase: 1,
        validFrom: '2024-02-22',
      },
    ];
    const expectedXml = `<?xml version="1.0" encoding="UTF-8"?>
<importCurrency version="0.2">
  <currency>
    <currencyCode>USD</currencyCode>
    <description>AR</description>
    <exchangeRate>856,5000</exchangeRate>
    <exchangeBase>1</exchangeBase>
    <validFrom>2024-02-22</validFrom>
  </currency>
  <currency>
    <currencyCode>EUR</currencyCode>
    <description>EU</description>
    <exchangeRate>1.1122</exchangeRate>
    <exchangeBase>1</exchangeBase>
    <validFrom>2024-02-22</validFrom>
  </currency>
</importCurrency>`;

    const result = parseCurrencysToXml(currencyData);
    expect(result).toEqual(expectedXml);
  });

  it('should handle missing properties', () => {
    const currencyData = [
      {
        currencyCode: 'USD',
        description: 'AR',
        // Falta exchangeRate
        exchangeBase: 1,
        validFrom: '2024-02-22',
      },
    ];
    const expectedXml = `<?xml version="1.0" encoding="UTF-8"?>
<importCurrency version="0.2">
  <currency>
    <currencyCode>USD</currencyCode>
    <description>AR</description>
    <exchangeBase>1</exchangeBase>
    <validFrom>2024-02-22</validFrom>
  </currency>
</importCurrency>`;

    const result = parseCurrencysToXml(currencyData);
    expect(result).toEqual(expectedXml);
  });
});
