import chalk from 'chalk';
import lodash from 'lodash';
import { bootstrapClients } from './bootstrap/bootstrapClients';
import { bootstrapSandboxie } from './bootstrap/bootstrapSandboxie';
import { bootstrapStartBat } from './bootstrap/bootstrapStartBat';
import { config } from '../config';

const bootstrap = async () => {
  const {
    startTimeout,
    windowedMode,
    lowGraphics,
    highPriority,
    shuffleClients,
    activeClients,
    clients,
  } = config;

  const enabledClients = clients.slice(0, activeClients);
  const processedClients = shuffleClients ? lodash.shuffle(enabledClients) : enabledClients;

  try {
    await bootstrapClients(processedClients);
    console.log(`Копирование клиентов - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Копирование клиентов - ${chalk.red('ошибка')}`, err);
    throw err;
  }

  try {
    await bootstrapSandboxie(processedClients);
    console.log(`Настройка Sandboxie - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Настройка Sandboxie - ${chalk.red('ошибка')}`, err);
    throw err;
  }

  try {
    await bootstrapStartBat(
      processedClients,
      startTimeout,
      windowedMode,
      lowGraphics,
      highPriority,
    );
    console.log(`Создание start.bat - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Создание start.bat - ${chalk.red('ошибка')}`, err);
    throw err;
  }
};

bootstrap()
  .then(() => {
    console.log();
    console.log(chalk.bgGreen('Все операции выполнены успешно'));
  })
  .catch(() => {
    console.log();
    console.log(chalk.bgRed('На одном из этапов произошла ошибка'));
  });
