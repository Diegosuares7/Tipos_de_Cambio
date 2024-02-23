import * as path from 'path';
import { getHandlersFromDirectory } from './utiles/handler-utils';
import { Currency } from './interfaces/currency.interface';
import { parseCurrencysToXml } from './xml-parser/xml-parser';
import { uploadFiles } from './upload-file-s3/upload-files';

async function processCurrencies(country: string): Promise<string> {
  const handlerDirectory = path.join(__dirname, './handlers');
  const handlerFiles = getHandlersFromDirectory(handlerDirectory, country);
  const currencyData = await getCurrencysToParse(handlerFiles, country);
  const xmlData = parseCurrencysToXml(currencyData);

  return xmlData;
}

async function getCurrencysToParse(handlerFiles, country): Promise<Currency[]> {
  const currencyData: Currency[] = [];
  const promises = handlerFiles.map(async (handler) => {
    const data = await handler.getCurrencyData();
    currencyData.push(data);
  });
  await Promise.all(promises);
  uploadFiles(currencyData, country);

  return currencyData;
}

processCurrencies('chile');
