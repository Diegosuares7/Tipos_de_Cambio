import axios from 'axios';
import * as cheerio from 'cheerio';
import { getCurrentDateDDMMYYYY } from '../../utiles/get-date';
import { handleStepError } from '../../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { FailedFetchUrlException } from '../../utiles/exceptions/faild-fetch-url.exception';

export async function getWebScraping(url: string, labelSelector: string): Promise<{ value: string; date: string }> {
  let response;
  try {
    const params = new URLSearchParams();
    params.append('date2', getCurrentDateDDMMYYYY());
    params.append('pp1', '1');

    response = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    throw new FailedFetchUrlException();
  }

  try {
    const $ = cheerio.load(response.data);

    const value = $(labelSelector).next().next().text().trim();

    const date = new Date().toISOString().slice(0, 10);

    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}
