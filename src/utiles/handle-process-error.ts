import { CurrencyProcess } from '../interfaces/currency.interface';

export function handleProcessError(message: string, handlerName: string): CurrencyProcess {
  return {
    success: false,
    handlerFailDescription: {
      errorMessage: message,
      handlerName: handlerName,
    },
  };
}
