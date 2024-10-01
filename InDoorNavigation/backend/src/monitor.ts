import { Application, Request, Response } from 'express';
import logger from './lib/logger/index.js';
import promClient from 'prom-client';

export function setupMonitoring(app: Application): void {
    app.get('/metrics', async (req: Request, res: Response) => {
        try {
            const metrics = await promClient.register.metrics();
            res.set('Content-Type', promClient.register.contentType);
            res.end(metrics);
        } catch (err) {
            res.status(500).send(`Error: ${err.message}`);
        }
    });
}