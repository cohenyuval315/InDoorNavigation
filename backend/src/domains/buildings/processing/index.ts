import {Router } from 'express';
import pointsRouter from './points/api/pointsRoutes.js';
import routesRouter from './routes/api/routesRoutes.js';

const processingRouter = Router();

processingRouter.use('/points', pointsRouter);
processingRouter.use('/routes', routesRouter);

export default processingRouter;



