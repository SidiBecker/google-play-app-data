import { Request, Response } from 'express';
import gplay from 'google-play-scraper';

async function getAppData(appId: string, lang: string, country: string) {
  try {
    const appData = await gplay.app({
      appId,
      lang: lang || 'en',
      country: country || 'us',
    });
    return appData;
  } catch (err) {
    console.error(`Error on try to get data from app ${appId}`);
  }
}

async function getAppListData(
  packageIdList: string[],
  lang: string,
  country: string
) {
  const appDataList: any = [];

  for (const appId of packageIdList) {
    try {
      const appData = await gplay.app({
        appId,
        lang: lang || 'en',
        country: country || 'us',
      });
      appDataList.push(appData);
    } catch (err) {
      console.error(`Error on try to get data from app ${appId}`);
    }
  }

  return appDataList;
}

async function getVersion(req: Request, res: Response) {
  const { lang, country }: any = req.query;
  const packageId = req.params.id;
  res.json(await getAppData(packageId, lang, country));
}

async function getAppDataList(req: Request, res: Response) {
  const { lang, country, appIdList }: any = req.body;
  const appList = await getAppListData(appIdList, lang, country);
  res.json(appList);
}

export default { getVersion, getAppDataList };
