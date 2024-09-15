/// <reference types="./global.d.ts" />
import './prelude';

import { Logger } from '@nestjs/common';

import { createApp } from './app';

const app = await createApp();
const listeningHost = Soundline.deploy ? '0.0.0.0' : 'localhost';
await app.listen(Soundline.port, listeningHost);

const logger = new Logger('App');

logger.log(`Soundline Server is running in [${Soundline.type}] mode`);
logger.log(`Listening on http://${listeningHost}:${Soundline.port}`);
logger.log(`And the public server should be recognized as ${Soundline.baseUrl}`);
