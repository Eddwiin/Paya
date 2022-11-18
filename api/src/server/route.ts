import { PATH_CONFIG } from "../core/paths.config";
import { Express, Request, Response } from 'express';

export function initRoutes(server: Express) {
    server.get(PATH_CONFIG.ROOT, (req: Request, res: Response) => {
        res.send('Hello World!')
    })
}