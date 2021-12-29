import path from 'path';
import lodash from 'lodash';
import fs from 'fs-extra';
import { parseNicknames } from '../utils/parseNicknames';
import { ConfigType } from '../types/ConfigType';

export const bootstrapClients = async (clients: ConfigType['clients']): Promise<void> => {
  const clientPath = path.join(__dirname, '../../clients/CS');

  const copyOperations = clients.map((client, i) => {
    return fs.copy(clientPath, `${clientPath}_${i + 1}`, {
      recursive: true,
      overwrite: true,
    });
  });

  await Promise.all(copyOperations);

  const readOperations = clients.map((client, i) => {
    return fs.readFile(`${clientPath}_${i + 1}/cstrike/config.cfg`, 'utf-8');
  });

  const [userConfig, configs, nicknames] = await Promise.all([
    fs.readFile(path.join(__dirname, '../../userconfig.cfg'), 'utf-8'),
    Promise.all(readOperations),
    parseNicknames(),
  ]);

  const configureOperations = clients.map((client, i) => {
    const { nickname, steamId } = client;
    const config = configs[i];
    const configPath = path.join(__dirname, `../../clients/CS_${i + 1}/cstrike/config.cfg`);
    const userConfigPath = path.join(__dirname, `../../clients/CS_${i + 1}/cstrike/userconfig.cfg`);
    const changerASIPath = path.join(__dirname, '../utils/changer.asi');
    const changerDLLPath = path.join(__dirname, '../utils/changer.dll');

    const processedUserConfig = userConfig
      .replace(
        '%name%',
        nickname || nicknames[lodash.random(0, nicknames.length - 1)],
      )
      .replace(
        'steam_random_id "1"',
        steamId ? `steam_set_id "${steamId}"` : 'steam_random_id "1"',
      );

    const operations = [
      fs.writeFile(userConfigPath, processedUserConfig),
      fs.copy(changerASIPath, `${clientPath}_${i + 1}/changer.asi`),
      fs.copy(changerDLLPath, `${clientPath}_${i + 1}/changer.dll`),
    ];

    if (!config.includes('exec userconfig.cfg')) {
      operations.push(
        fs.writeFile(configPath, `${config}\nexec userconfig.cfg`),
      );
    }

    return operations;
  });

  await Promise.all(configureOperations.flat());
};
