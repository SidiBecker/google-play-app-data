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

  controlAppsCache(appDataList);

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
  const { lang, country, appIdList } = req.body;

  if (global.appList != null && global.appList.length > 0) {

    console.log(global.appList.length)

    const responseData = [];
    const appsToSearch = [];

    appIdList.forEach((appId) => {
      const app = global.appList.find((app) => (appId == app.appId));
      if (app != null) {
        responseData.push(app);
      } else {
        appsToSearch.push(appId);
      }
    });

    if (appsToSearch.length > 0) {
      appsToSearch.forEach(async (appId) => {
        const app = await getAppData(appId, lang, country);
        if (app) {
          responseData.push(app);
        }
      });
    }

    controlAppsCache(responseData);

    return res.json(responseData);
  } else {
    getAppDataList(req, res);
  }
}

function controlAppsCache(appDataList) {
  if (global.appList == null) {
    global.appList = [];
  }

  appDataList.forEach((appData) => {
    global.appList = global.appList.filter(
      (cachedAppData) => cachedAppData.appId != appData.appId
    );

    global.appList.push(appData);
  });
}

function getAppDataListFromStore(req, res) {
  global.appList = [];

  return getAppDataList(req, res);
}

export default { getVersion, getAppDataListFromStore, getAppDataListFromCache };
