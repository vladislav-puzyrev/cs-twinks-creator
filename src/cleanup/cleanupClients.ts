import path from 'path';
import fs from 'fs-extra';

export const cleanupClients = async (): Promise<void> => {
  const clientsPath = path.join(__dirname, '../../clients');
  const clientsNames = await fs.readdir(clientsPath);

  const removeOperations = clientsNames
    .filter((clientName) => clientName !== 'CS')
    .map((clientName) => fs.remove(`${clientsPath}/${clientName}`));

  await Promise.all(removeOperations);
};
