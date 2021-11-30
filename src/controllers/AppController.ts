import { Request, Response } from 'express';
import gplay from 'google-play-scraper';

async function getAppData(packageId: string, lang: string, country: string) {
  const appData = await gplay.app({
    appId: packageId,
    lang: lang || 'en',
    country: country || 'us',
  });
  return appData;
}

async function getVersion(req: Request, res: Response) {
  const { lang, country }: any = req.query;
  const packageId = req.params.id;
  res.json(await getAppData(packageId, lang, country));
}

export default { getVersion };
