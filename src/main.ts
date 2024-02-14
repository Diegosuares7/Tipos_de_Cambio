import * as path from 'path';
import { getHandlersFromDirectory } from './utiles/handler-utils';
import { Currency } from './interfaces/currency.interface';

async function processCurrencies(): Promise<Currency[]> {
  const handlerDirectory = path.join(__dirname, './handlers');
  const handlerFiles = getHandlersFromDirectory(handlerDirectory);

  const currencyData: Currency[] = []; //devuelve un array de la interface que voy a definir

  const promises = handlerFiles.map(async (handler) => {
    const data = await handler.getCurrencyData();
    currencyData.push(data);
  });

  await Promise.all(promises);

  return currencyData;
}

processCurrencies();
