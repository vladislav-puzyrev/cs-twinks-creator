import fs from 'fs-extra'
import lodash from 'lodash'
import { parseNames } from '../utils/parseNames'

export const changeName = async (usercfgPath: string): Promise<void> => {
  const [usercfg, names] = await Promise.all([fs.readFile(usercfgPath, 'utf-8'), parseNames()])
  const nameCommand = `name "${names[lodash.random(0, names.length - 1)]}"`

  const beforeNameIndex = usercfg.indexOf('name')
  const afterNameIndex = usercfg.indexOf('\n', beforeNameIndex)
  const processedUsercfg = usercfg.slice(0, beforeNameIndex) + nameCommand + usercfg.slice(afterNameIndex)

  await fs.writeFile(usercfgPath, processedUsercfg)
}
