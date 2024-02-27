import { FailedFetchUrlException } from '../exceptions/faild-fetch-url.exception';
import { InvalidSelectorException } from '../exceptions/invalid-selector.exception';
import { getViaWebScraping } from '../get-via-web-scraping';

it('should throw InvalidSelectorException when fetching data from an invalid URL', async () => {
  const url = 'https://example.com';
  const labelSelector = '.value';

  await expect(getViaWebScraping(url, labelSelector)).rejects.toThrow(InvalidSelectorException);
});

it('should throw FailedFetchUrlException when fetching data from an empty URL', async () => {
  const url = '';
  const labelSelector = '.value';

  await expect(getViaWebScraping(url, labelSelector)).rejects.toThrow(FailedFetchUrlException);
});
