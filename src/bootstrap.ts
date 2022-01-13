import chalk from 'chalk';
import lodash from 'lodash';
import { copyClients } from './bootstrap/copyClients';
import { configureSandboxie } from './bootstrap/configureSandboxie';
import { createStartBat } from './bootstrap/createStartBat';
import { config } from '../public/config';

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

  if (activeClients < 1 || activeClients > 32) {
    const err = new Error('activeClients must be greater than 1 and less than 32');
    console.log(`Проверка конфигурации - ${chalk.red('ошибка')}`, err);
    throw err;
  }

  const enabledClients = clients.slice(0, activeClients);
  const processedClients = shuffleClients ? lodash.shuffle(enabledClients) : enabledClients;

  try {
    await copyClients(processedClients);
    console.log(`Копирование клиентов - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Копирование клиентов - ${chalk.red('ошибка')}`, err);
    throw err;
  }

  try {
    await configureSandboxie(processedClients);
    console.log(`Настройка Sandboxie - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Настройка Sandboxie - ${chalk.red('ошибка')}`, err);
    throw err;
  }

  try {
    await createStartBat(
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
