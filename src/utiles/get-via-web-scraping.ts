import axios from 'axios';
import * as cheerio from 'cheerio';
import { FailedFetchUrlException } from './exceptions/faild-fetch-url.exception';
import { InvalidSelectorException } from './exceptions/invalid-selector.exception';
import { handleStepError } from '../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../exceptions/steps.constants';

export async function getViaWebScraping(url: string, labelSelector: string): Promise<{ value: string; date: string }> {
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    throw new FailedFetchUrlException();
  }

  try {
    const $ = cheerio.load(response.data);

    const selectedElement = $(labelSelector);

    if (selectedElement.length === 0) {
      throw new InvalidSelectorException();
    }

    const value = selectedElement.text().trim();
    const date = new Date().toISOString().slice(0, 10);

    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}
