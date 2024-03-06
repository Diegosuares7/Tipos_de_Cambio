import * as fs from 'fs';
import * as path from 'path';
import { CurrencyHandler } from '../interfaces/currency-handler.interface';
import { FaildReadDirectoryException } from './exceptions/faild-read-directory.exception';
import { handleStepError } from '../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../exceptions/steps.constants';
import Logger from '../configurations/config-logs/winston.logs';

type HandlerModule = Record<string, new () => CurrencyHandler>;
export function getHandlersFromDirectory(directoryPath: string, country: string): CurrencyHandler[] {
  const handlers: CurrencyHandler[] = [];

  // Verificar si el directorio existe
  if (!fs.existsSync(directoryPath)) {
    throw new FaildReadDirectoryException();
  }

  try {
    const files = fs.readdirSync(directoryPath);
    if (files.length === 0) {
      // Devolver un array vacío si el directorio está vacío
      return [];
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const folderName = path.basename(filePath);
        if (folderName == country) {
          handlers.push(...getHandlersFromDirectory(filePath, country));
          return handlers;
        }
      } else if (filePath.endsWith('.service.js')) {
        const handlerModule: HandlerModule = require(filePath);
        const handlerClass = Object.values(handlerModule)[0];
        if (typeof handlerClass === 'function') {
          handlers.push(new handlerClass());
        } else {
          throw new FaildReadDirectoryException();
        }
      }
    });
  } catch (error) {
    Logger.error(`Error: ${PROCESS_STEPS.SEARCH_COINS}:`, error);
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
  Logger.info(`Successfull: ${PROCESS_STEPS.SEARCH_COINS} in ${directoryPath}`);
  return handlers;
}
