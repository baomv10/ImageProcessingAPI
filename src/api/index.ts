import express from 'express';
import images from './images.api';

const routes = express.Router();

routes.use('/images', images);

export default routes;
