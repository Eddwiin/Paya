
import log4js from 'log4js';

log4js.configure({
    appenders: { server: { type: "file", filename: "server.log" } },
    categories: { default: { appenders: ["server"], level: "error" } }
})

export enum LogEnum {
    INFO = "info",
    ERROR = "error",
}

export class LoggingService {
    private static instance: LoggingService = null;
    private static logger = log4js.getLogger();

    private constructor() { }

    public static getInstance() {
        if (LoggingService.instance === null) {
            LoggingService.instance = new LoggingService();
        }

        return LoggingService.instance;
    }

    public static pushLog(key: LogEnum, message: string) {
        LoggingService.logger.level = "debug";
        LoggingService.logger[key](message);
    }
}