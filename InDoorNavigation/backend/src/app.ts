import express from "express";
import cors from 'cors';
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import router from './domains/index.js';
import { validateRequest } from "./middlewares/validationMiddleware.js";



const createApplication = () => {
    const app = express();
    app.use(bodyParser.json({ limit: '1gb' })); 
    app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
    app.use(compression());
    app.use(morgan('dev'));
    
    app.use(cors());
    app.use('/', router);
    app.use(validateRequest);
    return app;    
}


export default createApplication;
