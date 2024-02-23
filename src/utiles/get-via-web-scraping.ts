import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getViaWebScraping(url: string, labelSelector: string): Promise<{ value: string; date: string }> {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const value = $(labelSelector).text().trim();
  const date = new Date().toISOString().slice(0, 10);

  return { value, date };
}
