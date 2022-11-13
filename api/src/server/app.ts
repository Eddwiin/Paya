import { createServer } from 'http';
import { LogEnum, LoggingServive } from '../utils/logging/logging.service';

export class App {
    private static instance: any = null;

    private constructor() { }

    public static getInstance() {
        if (App.instance === null) {
            App.instance = createServer((req, res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Hello World');
            })
        }

        return App.instance;
    }

    public static startServer(port: number, hostname: string) {
        const server = this.getInstance();

        server.listen(port, hostname, () => {
            let message = `Server running at http://${hostname}:${port}/`;
            LoggingServive.pushLog(LogEnum.INFORMATIONS, message)
        })
    }
}