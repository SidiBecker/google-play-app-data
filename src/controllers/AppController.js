import gplay from 'google-play-scraper';

async function getAppData(appId, lang, country) {
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
  packageIdList,
  lang,
  country
) {
  const appDataList = [];

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

async function getVersion(req, res) {
  const { lang, country } = req.query;
  const packageId = req.params.id;
  res.json(await getAppData(packageId, lang, country));
}

async function getAppDataList(req, res) {
  const { lang, country, appIdList } = req.body;
  const appList = await getAppListData(appIdList, lang, country);
  res.json(appList);
}

export default { getVersion, getAppDataList };
