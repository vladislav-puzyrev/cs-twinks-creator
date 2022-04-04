import { logger } from '../utils/logger'
import { removeClients } from './removeClients'
import { resetSandboxie } from './resetSandboxie'
import { removeStartBat } from './removeStartBat'

const cleanup = async (): Promise<void> => {
  try {
    logger('info', 'Идет удаление клиентов')
    await removeClients()
    logger('success', 'Завершено удаление клиентов')
  } catch (err) {
    if (err instanceof Error) {
      logger('error', `Ошибка удаления клиентов: ${err.message}`)
    }
  }

  try {
    logger('info', 'Идет сброс Sandboxie')
    await resetSandboxie()
    logger('success', 'Завершен сброс Sandboxie')
  } catch (err) {
    if (err instanceof Error) {
      logger('error', `Ошибка сброса Sandboxie: ${err.message}`)
    }
  }

  try {
    logger('info', 'Идет удаление start.bat')
    await removeStartBat()
    logger('success', 'Завершено удаление start.bat')
  } catch (err) {
    if (err instanceof Error) {
      logger('error', `Ошибка удаления start.bat: ${err.message}`)
    }
  }
}

cleanup()
  .then(() => {
    logger('success', 'Очистка завершена', { lineBreak: true })
  })
  .catch((err) => {
    if (err instanceof Error) {
      logger('error', `Непредвиденная ошибка: ${err.message}`, { lineBreak: true })
    }
  })
