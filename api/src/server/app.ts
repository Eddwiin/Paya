import { createServer } from 'http';
import { LogEnum, LoggingServive } from '../utils/logging/logging.service';
import process from 'node:process';
import { Cluster } from './cluster';
export class App {
    private instance: any = null;
    private cluster = new Cluster();

    constructor() { }

    public getInstance() {
        if (this.instance === null) {
            if (this.cluster.isPrimary()) {
                this.cluster.fork()
            } else {
                this.instance = this.createServer();
                LoggingServive.pushLog(LogEnum.INFORMATIONS, `Worker ${process.pid} started`)
            }
        }

        return this.instance;
    }

    public startServer(port: number, hostname: string) {
        const server = this.getInstance();

        if (server) {
            server.listen(port, hostname, () => {
                let message = `Server running at http://${hostname}:${port}/`;
                LoggingServive.pushLog(LogEnum.INFORMATIONS, message)
            })
        }
    }

    private createServer() {
        return createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World');
        })

    }
}