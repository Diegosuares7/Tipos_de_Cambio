import * as path from 'path';
import { getHandlersFromDirectory } from './utiles/handler-utils';
import { Currency, CurrencyErrorHandler, CurrencyHandlerResponse } from './interfaces/currency.interface';
import { parseCurrencysToXml } from './xml-parser/xml-parser';
import { uploadFiles } from './upload-file-s3/upload-files';

async function processCurrencies(country: string): Promise<string> {
  const handlerDirectory = path.join(__dirname, './handlers');
  const handlerFiles = getHandlersFromDirectory(handlerDirectory, country);
  const currencyData = await getCurrencysToParse(handlerFiles, country);
  const xmlData = parseCurrencysToXml(currencyData);

  return xmlData;
}

async function getCurrencysToParse(handlerFiles, country): Promise<CurrencyHandlerResponse> {
  const currencyData: Currency[] = [];
  const currencyError: CurrencyErrorHandler[] = [];
  const promises = handlerFiles.map(async (handler) => {
    const data = await handler.getCurrencyData();
    if (data.success) {
      currencyData.push(data.currency);
    } else if (data.success === false) {
      currencyError.push(data.handlerFailDescription);
    }
  });
  await Promise.all(promises);
  uploadFiles(currencyData, country);

  return { currency: currencyData, currencyErrorHandler: currencyError };
}

processCurrencies('chile');
