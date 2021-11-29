import express, { Router } from 'express';

import VersionController from './routes/VersionRoutes';

const routes = Router();

routes.use('/version', VersionController);

export default routes;
