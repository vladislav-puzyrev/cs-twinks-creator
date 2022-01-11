import chalk from 'chalk';
import { cleanupClients } from './cleanup/cleanupClients';
import { cleanupSandboxie } from './cleanup/cleanupSandboxie';
import { cleanupStartBat } from './cleanup/cleanupStartBat';

const cleanup = async () => {
  try {
    await cleanupClients();
    console.log(`Удаление клиентов - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Удаление клиентов - ${chalk.red('ошибка')}`, err);
  }

  try {
    await cleanupSandboxie();
    console.log(`Сброс Sandboxie - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Сброс Sandboxie - ${chalk.red('ошибка')}`, err);
  }

  try {
    await cleanupStartBat();
    console.log(`Удаление start.bat - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Удаление start.bat - ${chalk.red('ошибка')}`, err);
  }
};

cleanup()
  .then(() => {
    console.log();
    console.log(chalk.bgGreen('Очистка произведена успешно'));
  })
  .catch(() => {
    console.log();
    console.log(chalk.bgRed('Произошла непредвиденная ошибка'));
  });
