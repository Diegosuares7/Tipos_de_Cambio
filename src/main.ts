import * as path from 'path';
import { getHandlersFromDirectory } from './utiles/handler-utils';
import { Currency } from './interfaces/currency.interface';
import { parseCurrencysToXml } from './xml-parser/xml-parser';
import { uploadFiles } from './upload-file-s3/upload-files';

async function processCurrencies(country: string): Promise<string> {
  const handlerDirectory = path.join(__dirname, './handlers');
  const handlerFiles = getHandlersFromDirectory(handlerDirectory, country);
  const currencyData = await getCurrencysToParse(handlerFiles);
  const xmlData = await parseCurrencysToXml(currencyData);
  uploadFiles(xmlData, country);
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

if (process.env.COUNTRY) {
  processCurrencies(process.env.COUNTRY);
} else {
  throw new Error(`Variable de entorno COUNTRY no definida.`);
}
