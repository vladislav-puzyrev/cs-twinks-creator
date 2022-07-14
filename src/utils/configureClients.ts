import path from 'path'
import fs from 'fs-extra'
import lodash from 'lodash'
import { parseNames } from './parseNames'
import { ClientType } from '../types/ClientType'

export const configureClients = async (clients: ClientType[]): Promise<void> => {
  const clientPath = path.join(__dirname, '../../settings/clients/CS')
  const modsPath = path.join(__dirname, '../../settings/mods')

  const [usercfg, cfg, names] = await Promise.all([
    fs.readFile(path.join(__dirname, '../../settings/userconfig.cfg'), 'utf-8'),
    fs.readFile(path.join(__dirname, '../../settings/clients/CS_1/cstrike/config.cfg'), 'utf-8'),
    parseNames()
  ])

  const configureClientOperations = clients.map((client, i) => {
    const { name, steamId } = client
    const cfgPath = `${clientPath}_${i + 1}/cstrike/config.cfg`
    const usercfgPath = `${clientPath}_${i + 1}/cstrike/userconfig.cfg`

    const processedUsercfg = usercfg
      .replace(
        '%name%',
        name ?? names[lodash.random(0, names.length - 1)]
      )
      .replace(
        'steam_random_id "1"',
        (steamId != null) ? `steam_set_id "${steamId}"` : 'steam_random_id "1"'
      )

    const operations = [
      fs.copy(modsPath, `${clientPath}_${i + 1}`, { overwrite: true }),
      fs.writeFile(usercfgPath, processedUsercfg)
    ]

    if (!cfg.includes('exec userconfig.cfg')) {
      operations.push(
        fs.writeFile(cfgPath, `${cfg}\nexec userconfig.cfg`)
      )
    }

    return operations
  })

  await Promise.all(configureClientOperations.flat())
}
