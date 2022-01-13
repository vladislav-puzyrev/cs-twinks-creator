import path from 'path';
import lodash from 'lodash';
import fs from 'fs-extra';
import { parseNicknames } from '../utils/parseNicknames';
import { ClientType } from '../types/ClientType';

export const copyClients = async (clients: ClientType[]): Promise<void> => {
  const clientPath = path.join(__dirname, '../../public/clients/CS');
  const modsPath = path.join(__dirname, '../../public/mods');

  const copyClientOperations = clients.map((client, i) => {
    return fs.copy(clientPath, `${clientPath}_${i + 1}`, { overwrite: true });
  });

  await Promise.all(copyClientOperations);

  const [userConfig, config, nicknames] = await Promise.all([
    fs.readFile(path.join(__dirname, '../../public/userconfig.cfg'), 'utf-8'),
    fs.readFile(path.join(__dirname, '../../public/clients/CS/cstrike/config.cfg'), 'utf-8'),
    parseNicknames(),
  ]);

  const configureClientOperations = clients.map((client, i) => {
    const { nickname, steamId } = client;
    const configPath = `${clientPath}_${i + 1}/cstrike/config.cfg`;
    const userConfigPath = `${clientPath}_${i + 1}/cstrike/userconfig.cfg`;

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
      fs.copy(modsPath, `${clientPath}_${i + 1}`, { overwrite: true }),
      fs.writeFile(userConfigPath, processedUserConfig),
    ];

    if (!config.includes('exec userconfig.cfg')) {
      operations.push(
        fs.writeFile(configPath, `${config}\nexec userconfig.cfg`),
      );
    }

    return operations;
  });

  await Promise.all(configureClientOperations.flat());
};
