import express, { Router } from 'express';

import AppController from '../controllers/AppController.js';

const routes = Router();

routes.get('/:id', AppController.getVersion);

routes.post('/fromCache', AppController.getAppDataListFromCache);

routes.post('/fromStore', AppController.getAppDataListFromStore);

export default routes;
