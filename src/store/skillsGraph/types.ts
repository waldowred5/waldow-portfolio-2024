export interface SkillsGraphState {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  },
  orbOpacity: number,
  orbRadius: number,
  radius: number,
  statsDebugPanelEnabled: boolean,

  // Actions
  createNetwork: () => void,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (newOpacity: number) => void,
  updateOrbRadius: (newRadius: number) => void,
  updateStatsDebugPanelEnabled: (statsDebugPanelEnabled: boolean) => void,
}
