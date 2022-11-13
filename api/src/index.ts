import * as dotenv from 'dotenv';
import { App } from "./server/app";

dotenv.config();

const port = process.env.PORT || 3000;
const hostname: string = process.env.HOSTNAME || '127.0.0.1';

App.startServer(port as number, hostname);