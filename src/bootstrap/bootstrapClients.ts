import path from 'path';
import fs from 'fs-extra';
import { ConfigType } from '../types/ConfigType';

export const bootstrapClients = async (clients: ConfigType['clients']): Promise<void> => {
  const userConfig = await fs.readFile(path.join(__dirname, '../../userconfig.cfg'), 'utf-8');
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

  const configs = await Promise.all(readOperations);

  const configureOperations = clients.map((client, i) => {
    const { name } = client;
    const config = configs[i];
    const configPath = path.join(__dirname, `../../clients/CS_${i + 1}/cstrike/config.cfg`);
    const userConfigPath = path.join(__dirname, `../../clients/CS_${i + 1}/cstrike/userconfig.cfg`);
    const changerASIPath = path.join(__dirname, '../utils/changer.asi');
    const changerDLLPath = path.join(__dirname, '../utils/changer.dll');

    const operations = [
      fs.writeFile(userConfigPath, userConfig.replace('%name%', name)),
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
