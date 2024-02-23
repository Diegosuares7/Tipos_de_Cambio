export interface Currency {
  currencyCode: string;
  description: string;
  exchangeRate: string;
  exchangeBase: number;
  validFrom: string;
}

export interface CurrencyErrorHandler {
  errorMessage: string;
  handlerName: string;
}

export interface CurrencyProcess {
  success: boolean;
  currency?: Currency;
  handlerFailDescription?: CurrencyErrorHandler;
}

export interface CurrencyHandlerResponse {
  currency: Currency[];
  currencyErrorHandler: CurrencyErrorHandler[];
}
