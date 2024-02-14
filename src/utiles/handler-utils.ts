import * as fs from 'fs';
import * as path from 'path';
import { CurrencyHandler } from '../interfaces/currency-handler.interface';

type HandlerModule = Record<string, new () => CurrencyHandler>;
export function getHandlersFromDirectory(directoryPath: string): CurrencyHandler[] {
  const handlers: CurrencyHandler[] = [];
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      handlers.push(...getHandlersFromDirectory(filePath));
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
