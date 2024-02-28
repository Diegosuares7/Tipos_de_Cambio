import axios from 'axios';
import * as cheerio from 'cheerio';
import { handleStepError } from '../../exceptions/step-error.handler';
import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { FailedFetchUrlException } from '../../utiles/exceptions/faild-fetch-url.exception';

type CheerioRoot = ReturnType<typeof cheerio.load>;

async function fetchData(url: string): Promise<CheerioRoot> {
  let response;
  try {
    response = await axios.post(url, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Cache-Control': 'no-cache',
        Cookie:
          'visid_incap_2355492=rhUIII0WTTCEUEP4VhDaeQT/3GUAAAAAQUIPAAAAAAAKp/tyvz3WziMelF0ZTFbK; incap_ses_129_2355492=x5aMBVGe43Lg8NbWK03KAQT/3GUAAAAA8L5LgKcAs1C/1XClyd4jKw==; ASP.NET_SessionId=jgmm3ocjungbn2kd3ji140rm; dtCookie=v_4_srv_1_sn_D48102799401B4563E3194073C9ECEB7_perc_100000_ol_0_mul_1_app-3Aa7babc1dd8d57c64_1; TS01fc2e41=019955ae16cdf69d9cc329fa6770dd0f22f3525e81b80e242601733443de54e29a68b2bdf48207003093206243e98446cdba59f8143654a0647c6e77415dcd48df5bd64a5b6580977ff2cb9bb7a81b6c40c8eca985; rxVisitor=1708982022190I4UNB0JF2BDDSNJA49PME5FCE5CASKRM; dtSa=-; dtLatC=1; rxvt=1708984838622|1708982022192; dtPC=1$182027222_545h7vRLQRJPHVKHAVAANAJFVKHMDLAUIMCRNL-0e0',
        Origin: 'https://www.sbs.gob.pe',
        Referer: url,
        'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'X-Dtpc': '1$182027222_545h7vRLQRJPHVKHAVAANAJFVKHMDLAUIMCRNL-0e0',
        'X-Microsoftajax': 'Delta=true',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  } catch (error) {
    throw new FailedFetchUrlException();
  }

  try {
    return cheerio.load(response.data);
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}

export async function getWebScrapingDolarCanadiense(
  url: string,
  labelSelector: string,
): Promise<{ value: string; date: string }> {
  const $ = await fetchData(url);
  try {
    const value = $(labelSelector).next().text().trim();
    const date = new Date().toISOString().slice(0, 10);
    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}

export async function getWebScrapingGeneral(
  url: string,
  labelSelector: string,
): Promise<{ value: string; date: string }> {
  const $ = await fetchData(url);
  try {
    const value = $(labelSelector).next().text().trim();
    const date = new Date().toISOString().slice(0, 10);
    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}

export async function getWebScrapingLibraEsterlina(
  url: string,
  labelSelector: string,
): Promise<{ value: string; date: string }> {
  const $ = await fetchData(url);
  try {
    const value = $(labelSelector).next().text().trim();
    const date = new Date().toISOString().slice(0, 10);
    return { value, date };
  } catch (error) {
    throw handleStepError(error, PROCESS_STEPS.SEARCH_COINS);
  }
}
