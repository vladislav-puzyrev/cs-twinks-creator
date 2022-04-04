import path from 'path'
import lodash from 'lodash'
import fs from 'fs-extra'
import { logger } from '../utils/logger'
import { copyClients } from './copyClients'
import { configureSandboxie } from './configureSandboxie'
import { createStartBat } from './createStartBat'
import { ConfigType } from '../types/ConfigType'

const bootstrap = async (): Promise<void> => {
  const config: ConfigType = await fs.readJSON(path.join(__dirname, '../../user-data/config.json'))

  const {
    startTimeout,
    windowedMode,
    lowGraphics,
    highPriority,
    shuffleClients,
    activeClients,
    clients
  } = config

  if (activeClients < 1 || activeClients > 32) {
    const err = new Error('activeClients must be greater than 1 and less than 32')
    logger('error', `Ошибка конфигурации: ${err.message}`)
    throw err
  }

  const enabledClients = clients.slice(0, activeClients)
  const processedClients = shuffleClients ? lodash.shuffle(enabledClients) : enabledClients

  try {
    logger('info', 'Идет копирование клиентов')
    await copyClients(processedClients)
    logger('success', 'Завершено копирование клиентов')
  } catch (err) {
    if (err instanceof Error) {
      logger('error', `Ошибка копирования клиентов: ${err.message}`)
      throw err
    }
  }

  try {
    logger('info', 'Идет настройка Sandboxie')
    await configureSandboxie(processedClients)
    logger('success', 'Завершена настройка Sandboxie')
  } catch (err) {
    if (err instanceof Error) {
      logger('error', `Ошибка настройки Sandboxie: ${err.message}`)
      throw err
    }
  }

  try {
    logger('info', 'Идет создание start.bat')
    await createStartBat(
      processedClients,
      startTimeout,
      windowedMode,
      lowGraphics,
      highPriority
    )
    logger('success', 'Завершено создание start.bat')
  } catch (err) {
    if (err instanceof Error) {
      logger('error', `Ошибка создания start.bat: ${err.message}`)
      throw err
    }
  }
}

bootstrap()
  .then(() => {
    logger('success', 'Настройка завершена', { lineBreak: true })
  })
  .catch((err) => {
    if (err instanceof Error) {
      logger('error', `Непредвиденная ошибка: ${err.message}`, { lineBreak: true })
    }
  })
