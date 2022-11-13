
export enum LogEnum {
    INFORMATIONS = "informations",
    ERRORS = "errors"
}

export type LogType = { [key in LogEnum]: string[]; }

export class LoggingServive {
    private static instance: LoggingServive = null;
    private logs: LogType;

    private constructor() {
        this.logs = {
            [LogEnum.INFORMATIONS]: [],
            [LogEnum.ERRORS]: []
        }
    }

    public static getInstance(key?: LogEnum) {
        if (LoggingServive.instance === null) {
            LoggingServive.instance = new LoggingServive();
        }

        return LoggingServive.getInstanceByKey(key) || LoggingServive.instance.logs;
    }

    public static pushLog(key: LogEnum, message: string) {
        let copyOfInst = this.getInstance(key) as string[];
        copyOfInst = [...copyOfInst, message];
        LoggingServive.instance.logs[key] = [...copyOfInst];
        this.displayLogInConsole(key, message);
    }

    private static displayLogInConsole(key: LogEnum, message: string) {
        switch (key) {
            case LogEnum.INFORMATIONS:
                console.log(`[INFO]: ${message}`);
                break;

            case LogEnum.ERRORS:
                console.error(`[ERROR]: ${message}`);
                break;
        }
    }
    private static getInstanceByKey(key: LogEnum) {
        return LoggingServive.instance.logs[key];
    }
}