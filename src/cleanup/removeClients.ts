import path from 'path'
import fs from 'fs-extra'

export const removeClients = async (): Promise<void> => {
  const clientsPath = path.join(__dirname, '../../public/clients')
  const clientsNames = await fs.readdir(clientsPath)

  const removeClientOperations = clientsNames
    .filter((clientName) => clientName !== 'CS')
    .map(async (clientName) => await fs.remove(`${clientsPath}/${clientName}`))

  await Promise.all(removeClientOperations)
}
