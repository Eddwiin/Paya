import { cpus } from 'node:os';
import cluster from 'node:cluster';
import { LogEnum, LoggingService } from '../utils/logging/logging.service';

export class Cluster {
    numCPUs: number;

    constructor() {
        this.numCPUs = cpus().length;
    }

    public isPrimary() {
        return cluster.isPrimary
    }

    public fork() {
        for (let i = 0; i < this.numCPUs; i++) {
            cluster.fork();
        }

        this.onClusterExit();
    }

    private onClusterExit() {
        cluster.on('exit', (worker) => {
            LoggingService.pushLog(LogEnum.INFO, `worker ${worker.process.pid} died`)
        })
    }
}