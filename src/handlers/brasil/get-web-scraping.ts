import axios from 'axios';
import * as cheerio from 'cheerio';
import { getCurrentDateDDMMYYYYformat, getYesterdayDateDDMMYYYY } from '../../utiles/get-date';
import { handleStepError } from '../../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { FailedFetchUrlException } from '../../utiles/exceptions/faild-fetch-url.exception';
import { checkValue } from '../../utiles/check-value';

export async function getWebScraping(
  url: string,
  labelSelector: string,
  numberCurrency: string,
): Promise<{ value: string; date: string }> {
  let response;
  try {
    const payload = new URLSearchParams();
    payload.append('method', 'consultarBoletim');
    payload.append('RadOpcao', '1');
    payload.append('DATAINI', getYesterdayDateDDMMYYYY());
    payload.append('DATAFIM', getCurrentDateDDMMYYYYformat());
    payload.append('ChkMoeda', numberCurrency);

    response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    throw new FailedFetchUrlException();
  }

  try {
    const $ = cheerio.load(response.data);
    const value = $(labelSelector).text();
    const date = new Date().toISOString().slice(0, 10);
    checkValue(value);

    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}
