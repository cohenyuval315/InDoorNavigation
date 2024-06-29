import {Router } from 'express';
import buildingDataRouter from './data/api/buildingDataRoutes.js';
import graphRouter from './graph/api/buildingGraphRoutes.js';
import magneticRouter from './magnetic/api/buildingMagneticRoutes.js';
import mapRouter from './map/api/buildingMapRoutes.js';
import processingRouter from './processing/index.js';

const buildingRouter = Router();

buildingRouter.use('/data', buildingDataRouter);
buildingRouter.use('/graph', graphRouter);
buildingRouter.use('/magnetic', magneticRouter);
buildingRouter.use('/map', mapRouter);
buildingRouter.use('/processing', processingRouter);


export default buildingRouter;
