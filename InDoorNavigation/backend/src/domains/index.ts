import { Router } from "express";
import navigationRouter from "./navigation/index.js";
import userRouter from "./users/index.js";
import appDataRouter from "./app-data/index.js";
import buildingRouter from "./buildings/index.js";
import localizationRouter from "./localization/index.js";
import processingRouter from "./buildings/processing/index.js";
import apiRouter from "./api/index.js";
import tilesRouter from "./tiles/index.js";

const router = Router();

router.use('/tiles',tilesRouter)
router.use('/api',apiRouter);
router.use('/navigation', navigationRouter);
router.use('/localization', localizationRouter);
router.use('/user', userRouter);
router.use('/app', appDataRouter);
router.use('/buildings', buildingRouter);
router.use('/processing', processingRouter);


export default router;
