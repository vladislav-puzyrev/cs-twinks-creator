import { ClientType } from './ClientType'

export interface ConfigType {
  startTimeout: number
  windowedMode: boolean
  lowGraphics: boolean
  highPriority: boolean
  shuffleClients: boolean
  activeClients: number
  clients: ClientType[]
}
