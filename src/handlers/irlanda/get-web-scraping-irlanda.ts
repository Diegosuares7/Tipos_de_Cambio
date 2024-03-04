import axios from 'axios';
import * as cheerio from 'cheerio';
import { IRLANDA_ECB_URL } from '../../utiles/const-url';
import { handleStepError } from '../../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { NotFoundCoinException } from '../exceptions/not-found-coin.exception';

export async function getExchangeRate(coin: string): Promise<{ value: string; date: string }> {
  try {
    const response = await axios.get(IRLANDA_ECB_URL);
    const $ = cheerio.load(response.data);

    const currencyTable = $('table');

    const brlRow = currencyTable.find('tr').filter((index, element) => {
      return $(element).find('.currency a').text().trim() === coin;
    });

    // Verifica si se encontró la moneda
    if (!brlRow.length) {
      throw new NotFoundCoinException();
    }

    const value = brlRow.find('.spot.number .rate').text().trim();
    const date = new Date().toISOString().slice(0, 10);

    return {
      value,
      date,
    };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}
