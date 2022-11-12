import * as assert from "assert";
import { LogEnum, LoggingServive, LogType } from "./logging.service";

describe('LoggingServive', () => {

    it('should return all instances of logs', () => {
        const expectRes: LogType = {
            [LogEnum.INFORMATIONS]: [],
            [LogEnum.ERRORS]: []
        }
        const actualRes = LoggingServive.getInstance();
        assert.deepEqual(actualRes, expectRes)
    });

    it('should get instance by key', () => {
        const message = "This is a information test message";
        const key = LogEnum.INFORMATIONS;
        LoggingServive.pushLog(key, message);

        const expectRes = [message];
        const actualRes = LoggingServive.getInstance(key);

        assert.deepEqual(actualRes, expectRes);
    })
})