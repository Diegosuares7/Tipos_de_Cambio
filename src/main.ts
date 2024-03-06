import * as path from 'path';
import { getHandlersFromDirectory } from './utiles/handler-utils';
import { Currency, CurrencyErrorHandler, CurrencyHandlerResponse } from './interfaces/currency.interface';
import { parseCurrencysToXml } from './xml-parser/xml-parser';
import { uploadFiles } from './upload-file-s3/upload-files';
import { createErrorResponse, createSuccesResponse } from './response-handler/create-process-response';
import { ProcessResponse } from './entities/process-response.entity';
import { StepProcessHandledException } from './exceptions/step-process-handled.exception';
import Logger from './configurations/config-logs/winston.logs';

async function processCurrencies(country: string): Promise<ProcessResponse> {
  try {
    const handlerDirectory = path.join(__dirname, './handlers');
    const handlerFiles = getHandlersFromDirectory(handlerDirectory, country);
    const currencyData = await getCurrencysToParse(handlerFiles, country);
    const xmlData = parseCurrencysToXml(currencyData);

    Logger.info('Successfully execute Tipo de Cambio Integration');
    return createSuccesResponse(xmlData);
  } catch (error) {
    Logger.error('Error in Tipo de Cambio', error);
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

  if (currencyError.length > 0) {
    currencyError.forEach((error) => {
      Logger.error(`Error get currency to parse: ${error.errorMessage} in ${error.handlerName}`);
    });
  } else {
    Logger.info('Successfully get currency to parse');
  }

  return { currency: currencyData, currencyErrorHandler: currencyError };
}

processCurrencies('paraguay');
