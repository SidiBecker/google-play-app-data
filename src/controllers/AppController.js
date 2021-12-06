import gplay from 'google-play-scraper';

async function getAppData(appId, lang, country) {
  try {
    console.log('Trying to get info og app ', appId);
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

async function getAppListData(packageIdList, lang, country) {
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

  global.appList = appDataList;

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

async function getAppDataListFromCache(req, res) {
  const { appIdList } = req.body;

  if (global.appList != null && global.appList.length > 0) {
    global.appList.filter((app) => appIdList.includes(app.appId));
    return res.json(global.appList);
  } else {
    getAppDataList(req, res);
  }
}

function getAppDataListFromStore(req, res) {
  global.appList = [];

  return getAppDataList(req, res);
}

export default { getVersion, getAppDataListFromStore, getAppDataListFromCache };
