import axios from 'axios';
import * as cheerio from 'cheerio';
import { handleStepError } from '../../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { FailedFetchUrlException } from '../../utiles/exceptions/faild-fetch-url.exception';
import { checkValue } from '../../utiles/check-value';

export async function getWebScraping(
  url: string,
  labelSelector: string,
  currency: string,
): Promise<{ value: string; date: string }> {
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    throw new FailedFetchUrlException();
  }

  try {
    const $ = cheerio.load(response.data);

    // Buscar la fila que contiene la información de la moneda EUR
    const row = $(labelSelector).filter((index, element) => {
      return $(element).find('td:nth-child(3)').text().trim() === currency;
    });

    const value = row.find('td:nth-child(4)').text().trim();

    const date = new Date().toISOString().slice(0, 10);

    checkValue(value);

    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}
