import path from 'path';
import fs from 'fs-extra';

export const parseNicknames = async () => {
  const names = await fs.readFile(path.join(__dirname, '/nicknames.txt'), 'utf-8');

  return names
    .split('\n')
    .filter((name) => name)
    .map((name) => name.trim());
};
