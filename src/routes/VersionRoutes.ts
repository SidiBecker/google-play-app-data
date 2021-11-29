import express, { Router } from 'express';

import VersionController from '../controllers/VersionController';

const routes = Router();

routes.get('/', VersionController.list);

export default routes;
