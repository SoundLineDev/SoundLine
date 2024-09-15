import 'reflect-metadata';

import { cpSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { config } from 'dotenv';
import { omit } from 'lodash-es';

import {
  applyEnvToConfig,
  getDefaultSoundlineConfig,
} from './fundamentals/config';

const configDir = join(fileURLToPath(import.meta.url), '../config');
async function loadRemote(remoteDir: string, file: string) {
  const filePath = join(configDir, file);
  if (configDir !== remoteDir) {
    cpSync(join(remoteDir, file), filePath, {
      force: true,
    });
  }

  await import(pathToFileURL(filePath).href);
}

async function load() {
  const Soundline_CONFIG_PATH = process.env.Soundline_CONFIG_PATH ?? configDir;
  // Initializing Soundline config
  //
  // 1. load dotenv file to `process.env`
  // load `.env` under pwd
  config();
  // load `.env` under user config folder
  config({
    path: join(Soundline_CONFIG_PATH, '.env'),
  });

  // 2. generate Soundline default config and assign to `globalThis.Soundline`
  globalThis.Soundline = getDefaultSoundlineConfig();

  // TODO(@forehalo):
  //   Modules may contribute to ENV_MAP, figure out a good way to involve them instead of hardcoding in `./config/Soundline.env`
  // 3. load env => config map to `globalThis.Soundline.ENV_MAP
  await loadRemote(Soundline_CONFIG_PATH, 'Soundline.env.js');

  // 4. load `config/Soundline` to patch custom configs
  await loadRemote(Soundline_CONFIG_PATH, 'Soundline.js');

  // 5. load `config/Soundline.self` to patch custom configs
  // This is the file only take effect in [Soundline Cloud]
  if (!Soundline.isSelfhosted) {
    await loadRemote(Soundline_CONFIG_PATH, 'Soundline.self.js');
  }

  // 6. apply `process.env` map overriding to `globalThis.Soundline`
  applyEnvToConfig(globalThis.Soundline);

  if (Soundline.node.dev) {
    console.log(
      'Soundline Config:',
      JSON.stringify(omit(globalThis.Soundline, 'ENV_MAP'), null, 2)
    );
  }
}

await load();
