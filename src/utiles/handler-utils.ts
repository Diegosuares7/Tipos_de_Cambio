import * as fs from 'fs';
import * as path from 'path';
import { CurrencyHandler } from '../interfaces/currency-handler.interface';

type HandlerModule = Record<string, new () => CurrencyHandler>;
export function getHandlersFromDirectory(directoryPath: string, country: string): CurrencyHandler[] {
  const handlers: CurrencyHandler[] = [];
  const files = fs.readdirSync(directoryPath);

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
        console.error(`Error: No se encontró un constructor de clase en el archivo '${filePath}'.`);
      }
    }
  });

  return handlers;
}

export function validateEnvVariables(requiredVariables: string[]): void {
  for (const variable of requiredVariables) {
    if (!process.env[variable]) {
      throw new Error(`Variable de entorno '${variable}' no definida.`);
    }
  }
}
