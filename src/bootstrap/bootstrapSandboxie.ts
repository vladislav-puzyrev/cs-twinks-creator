import path from 'path';
import fs from 'fs-extra';
import { ClientType } from '../types/ClientType';

export const bootstrapSandboxie = async (clients: ClientType[]): Promise<void> => {
  let config = await fs.readFile(path.join(__dirname, '../utils/Sandboxie.ini'), 'utf-16le');

  clients.forEach((client, i) => {
    const clientPath = path.join(__dirname, `../../public/clients/CS_${i + 1}`);

    config += `
[CS_${i + 1}]
Enabled=y
AutoRecover=n
BlockNetworkFiles=y
RecoverFolder=%{374DE290-123F-4565-9164-39C4925E467B}%
RecoverFolder=%Personal%
RecoverFolder=%Desktop%
BorderColor=#00FFFF,ttl
Template=OpenBluetooth
Template=SkipHook
Template=FileCopy
Template=qWave
Template=BlockPorts
Template=LingerPrograms
Template=Chrome_Phishing_DirectAccess
Template=Firefox_Phishing_DirectAccess
Template=AutoRecoverIgnore
ConfigLevel=9
ForceFolder=${clientPath}
`;
  });

  await fs.writeFile('C:/Windows/Sandboxie.ini', config, { encoding: 'utf-16le' });
};
