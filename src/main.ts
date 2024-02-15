import * as path from 'path';
import { getHandlersFromDirectory } from './utiles/handler-utils';
import { Currency } from './interfaces/currency.interface';
import { parseCurrencysToXml } from './xml-Parser/xml-parser';

async function processCurrencies(): Promise<string> {
  const handlerDirectory = path.join(__dirname, './handlers');
  const handlerFiles = getHandlersFromDirectory(handlerDirectory);
  const currencyData = await getCurrencysToParse(handlerFiles);
  const xmlData = parseCurrencysToXml(currencyData);

  return xmlData;
}

async function getCurrencysToParse(handlerFiles): Promise<Currency[]> {
  const currencyData: Currency[] = [];
  const promises = handlerFiles.map(async (handler) => {
    const data = await handler.getCurrencyData();
    currencyData.push(data);
  });

  await Promise.all(promises);
  return currencyData;
}

processCurrencies();
