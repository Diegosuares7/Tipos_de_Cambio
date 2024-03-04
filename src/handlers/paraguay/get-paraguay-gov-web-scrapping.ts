import { ExchangeRate } from '../../enums/exchange-rate.enum';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { COLUMN_INDEX_CURRENCY, PARAGUAY_HANDLER_CONSTANTS } from './constants';
import { InvalidTableException } from './exceptions/invalid-table.exception';
import { WebScrappingCurrencyResult } from '../../entities/web-scrapping-result';
import { InvalidDayException } from './exceptions/invalid-day.exception';
import { FailedFetchUrlException } from '../../utiles/exceptions/faild-fetch-url.exception';

export async function getParaguayWebScrapping(currencyToFind: ExchangeRate): Promise<WebScrappingCurrencyResult> {
  const responseData = await getUrlInfo();
  const $ = cheerio.load(responseData);
  // Selecciono el primer titulo y leo el texto de a que mes pertenece
  const monthTitle = $(PARAGUAY_HANDLER_CONSTANTS.SELECTOR_TITULOS).first().text();
  //chequeo estar en el mes correcto
  checkMonthTitle(monthTitle);
  const table = $(PARAGUAY_HANDLER_CONSTANTS.SELECTOR_TABLAS).first(); // Ajusta el selector si es necesario
  // Encuentra la última fila de la tabla. Esto asume que la última fila contiene la información más reciente.
  const lastRow = table.find('tr').last();
  // obtengo la primer columna del tr que tiene el dia para validarlo
  const currentDay = lastRow.find('td').first().text().trim();
  checkDayValue(currentDay);
  const columnIndex = COLUMN_INDEX_CURRENCY[currencyToFind];
  const value = lastRow.find('td').eq(columnIndex!).text().trim();
  const date = new Date().toISOString().slice(0, 10);
  return { value, date };
}

function checkMonthTitle(monthTitle: string): void {
  const date = new Date();
  const month = getStringMonth(date);
  if (!monthTitle.toUpperCase().includes(month.toUpperCase())) {
    throw new InvalidTableException(month);
  }
}
function getStringMonth(date: Date): string {
  const month = date.getMonth() + 1;
  switch (month) {
    case 1:
      return 'ENERO';
    case 2:
      return 'FEBRERO';
    case 3:
      return 'MARZO';
    case 4:
      return 'ABRIL';
    case 5:
      return 'MAYO';
    case 6:
      return 'JUNIO';
    case 7:
      return 'JULIO';
    case 8:
      return 'AGOSTO';
    case 9:
      return 'SEPTIEMBRE';
    case 10:
      return 'OCTUBRE';
    case 11:
      return 'NOVIEMBRE';
    case 12:
      return 'DICIEMBRE';
    default:
      throw new Error('Invalid month');
  }
}
function checkDayValue(currentDay: string): void {
  const day = new Date().getDate();
  if (day !== Number(currentDay)) {
    throw new InvalidDayException(day.toString());
  }
}
async function getUrlInfo(): Promise<string> {
  try {
    const response = await axios.get(PARAGUAY_HANDLER_CONSTANTS.PARAGUAY_WEB_SCRAPPING_URL);
    return response.data;
  } catch {
    throw new FailedFetchUrlException();
  }
}
