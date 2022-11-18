import { createServer } from 'http';
import { LogEnum, LoggingService } from '../utils/logging/logging.service';
import process from 'node:process';
import { Cluster } from './cluster';
import { Class } from '../decorators/inject';
import { initRoutes } from './route';
import express, { Express } from 'express';
@Class
export class App {
    private instance: Express = null;
    private cluster: Cluster = new Cluster();

    constructor() { }

    public getInstance() {
        if (this.instance === null) {
            if (this.cluster.isPrimary()) {
                this.cluster.fork()
            } else {
                this.instance = express();
                LoggingService.pushLog(LogEnum.INFO, `Worker ${process.pid} started`)
            }
        }

        return this.instance;
    }

    public startServer(port: number, hostname: string) {
        const server = this.getInstance();

        if (server) {
            initRoutes(server);
            server.listen(port, hostname, () => {
                let message = `Server running at http://${hostname}:${port}/`;
                LoggingService.pushLog(LogEnum.INFO, message)
            })
        }
    }

}