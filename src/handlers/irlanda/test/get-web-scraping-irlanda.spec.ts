import axios from 'axios';
import { getExchangeRate } from '../get-web-scraping-irlanda';
import { NotFoundCoinException } from '../../exceptions/not-found-coin.exception';

describe('getExchangeRate', () => {
  it('should successfully fetch exchange rate for a given coin', async () => {
    // Mock axios.get to return a response with the desired data
    const mockResponse = {
      data: `
            <table>
              <tr>
                <td class="currency">
                  <a>coin1</a>
                </td>
                <td class="spot number">
                  <span class="rate">1.2345</span>
                </td>
              </tr>
              <tr>
                <td class="currency">
                  <a>coin2</a>
                </td>
                <td class="spot number">
                  <span class="rate">2.3456</span>
                </td>
              </tr>
            </table>
          `,
    };
    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    // Call the function with the desired coin
    const result = await getExchangeRate('coin1');

    // Assert the result
    expect(result).toEqual({ value: '1.2345', date: expect.any(String) });
  });

  it('should handle invalid coin input gracefully', async () => {
    // Mock axios.get to return a response with the desired data
    const mockResponse = {
      data: `
          <table>
            <tr>
              <td class="currency">
                <a>coin1</a>
              </td>
              <td class="spot number">
                <span class="rate">1.2345</span>
              </td>
            </tr>
            <tr>
              <td class="currency">
                <a>coin2</a>
              </td>
              <td class="spot number">
                <span class="rate">2.3456</span>
              </td>
            </tr>
          </table>
        `,
    };
    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    try {
      await getExchangeRate('invalidCoin');
    } catch (error) {
      // Assert the caught error is an instance of NotFoundCoinException
      expect(error).toBeInstanceOf(NotFoundCoinException);
    }
  });
});
