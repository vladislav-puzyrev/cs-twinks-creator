import path from 'path';
import fs from 'fs-extra';

export const parseNicknames = async () => {
  const nicknames = await fs.readFile(path.join(__dirname, '../../public/nicknames.txt'), 'utf-8');

  return nicknames
    .split('\n')
    .filter((name) => name)
    .map((name) => name.trim());
};
