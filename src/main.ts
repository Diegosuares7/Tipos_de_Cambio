import * as path from 'path';
import { getHandlersFromDirectory } from './utiles/handler-utils';
import { Currency, CurrencyErrorHandler, CurrencyHandlerResponse } from './interfaces/currency.interface';
import { parseCurrencysToXml } from './xml-parser/xml-parser';
import { uploadFiles } from './upload-file-s3/upload-files';
import { createErrorResponse, createSuccesResponse } from './response-handler/create-process-response';
import { ProcessResponse } from './entities/process-response.entity';
import { StepProcessHandledException } from './exceptions/step-process-handled.exception';

async function processCurrencies(country: string): Promise<ProcessResponse> {
  try {
    const handlerDirectory = path.join(__dirname, './handlers');
    const handlerFiles = getHandlersFromDirectory(handlerDirectory, country);
    const currencyData = await getCurrencysToParse(handlerFiles, country);
    const xmlData = parseCurrencysToXml(currencyData);

    return createSuccesResponse(xmlData);
  } catch (error) {
    if (error instanceof StepProcessHandledException) {
      return createErrorResponse(error.getErrorMessage());
    }
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    return createErrorResponse(errorMessage);
  }
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

processCurrencies('paraguay');
