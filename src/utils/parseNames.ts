import path from 'path'
import fs from 'fs-extra'

export const parseNames = async (): Promise<string[]> => {
  const names = await fs.readFile(path.join(__dirname, '../../settings/names.txt'), 'utf-8')

  return names
    .split('\n')
    .filter((name) => name)
    .map((name) => name.trim())
}
