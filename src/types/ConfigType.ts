export interface ConfigType {
  startTimeout: number
  windowedMode: boolean
  lowGraphics: boolean
  highPriority: boolean
  shuffleClients: boolean
  activeClients: number
  clients: Array<{
    nickname?: string | null
    steamId?: string | null
  }>
}
