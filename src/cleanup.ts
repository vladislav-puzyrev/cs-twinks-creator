import chalk from 'chalk';
import { removeClients } from './cleanup/removeClients';
import { resetSandboxie } from './cleanup/resetSandboxie';
import { removeStartBat } from './cleanup/removeStartBat';

const cleanup = async () => {
  try {
    await removeClients();
    console.log(`Удаление клиентов - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Удаление клиентов - ${chalk.red('ошибка')}`, err);
  }

  try {
    await resetSandboxie();
    console.log(`Сброс Sandboxie - ${chalk.green('успешно')}`);
  } catch (err) {
    console.log(`Сброс Sandboxie - ${chalk.red('ошибка')}`, err);
  }

  try {
    await removeStartBat();
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
