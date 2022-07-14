import path from 'path'
import decompress from 'decompress'
import { configureClients } from '../utils/configureClients'
import { ClientType } from '../types/ClientType'

export const copyClients = async (clients: ClientType[]): Promise<void> => {
  const clientPath = path.join(__dirname, '../../settings/clients/CS')

  const copyClientOperations = clients.map(async (client, i) => {
    return await decompress(`${clientPath}.zip`, `${clientPath}_${i + 1}`)
  })

  await Promise.all(copyClientOperations)
  await configureClients(clients)
}
