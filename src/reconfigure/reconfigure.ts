import path from 'path'
import fs from 'fs-extra'
import { logger } from '../utils/logger'
import { configureClients } from '../utils/configureClients'
import { changeName } from './changeName'
import { ConfigType } from '../types/ConfigType'

const reconfigure = async (): Promise<void> => {
  const config: ConfigType = await fs.readJSON(path.join(__dirname, '../../settings/config.json'))
  const { activeClients, clients } = config

  const enabledClients = clients.slice(0, activeClients)
  const usercfgPath = 'C:/Program Files (x86)/Steam/steamapps/common/Half-Life/cstrike/userconfig.cfg'
  const steamClientExists = await fs.pathExists(usercfgPath)

  try {
    logger('info', 'Идет настройка клиентов')
    await configureClients(enabledClients)
    logger('success', 'Завершена настройка клиентов')
  } catch (err) {
    if (err instanceof Error) {
      logger('error', `Ошибка настройки клиентов. ${err.message}`)
    }
  }

  if (steamClientExists) {
    try {
      logger('info', 'Идет смена ника в стимовской кс')
      await changeName(usercfgPath)
      logger('success', 'Завершена смена ника в стимовской кс')
    } catch (err) {
      if (err instanceof Error) {
        logger('error', `Ошибка смены ника в стимовской кс. ${err.message}`)
      }
    }
  }
}

reconfigure()
  .then(() => {
    logger('success', 'Перенастройка завершена', { lineBreak: true })
  })
  .catch((err) => {
    if (err instanceof Error) {
      logger('error', `Непредвиденная ошибка. ${err.message}`, { lineBreak: true })
    }
  })
