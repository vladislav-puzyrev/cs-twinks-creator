import chalk from 'chalk'

export const logger = (
  type: 'success' | 'error' | 'info' | 'warning' | 'standard',
  message: string,
  options?: { lineBreak?: boolean } | null
): void => {
  if (options?.lineBreak === true) {
    console.log()
  }

  const time = new Date().toLocaleTimeString()

  switch (type) {
    case 'success':
      console.log(chalk.green(`${time} SUCCESS — ${message}`))
      break
    case 'error':
      console.log(chalk.red(`${time} ERROR — ${message}`))
      break
    case 'info':
      console.log(chalk.blue(`${time} INFO — ${message}`))
      break
    case 'warning':
      console.log(chalk.yellow(`${time} WARNING — ${message}`))
      break
    case 'standard':
      console.log(message)
      break
  }
}
