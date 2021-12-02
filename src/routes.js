import express, { Router } from 'express';

import AppRoutes from './routes/AppRoutes.js';

const routes = Router();

routes.use('/app', AppRoutes);

export default routes;
