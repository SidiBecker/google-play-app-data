import express, { Router } from 'express';

import AppController from '../controllers/AppController';

const routes = Router();

routes.get('/:id', AppController.getVersion);

export default routes;
