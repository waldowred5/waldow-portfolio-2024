import { createWithEqualityFn } from 'zustand/traditional';

export enum PLAYER {
  NEUTRAL = 'NEUTRAL',
  PLAYER_1 = 'PLAYER_1',
  PLAYER_2 = 'PLAYER_2',
}

export type PLAYER_COLOR = {
  [key: string]: {
    edge: number[],
    hackBot: string,
    vertex: number[],
  },
}

export interface PlayerState {
  playerColors: PLAYER_COLOR,
  selectedPlayer: keyof typeof PLAYER,

  // Actions
  updateSelectedPlayer: (player: keyof typeof PLAYER) => void,
}


export const usePlayer = createWithEqualityFn<PlayerState>((set) => {
  return {
    playerColors: {
      [PLAYER.NEUTRAL]: {
        edge: [0.5, 0.5, 0.5],
        hackBot: 'lightgrey', // TODO: Set array based values
        vertex: [0.2, 0.2, 0.2],
      },
      [PLAYER.PLAYER_1]: {
        edge: [0.0, 0.3, 10.0],
        hackBot: 'cyan', // TODO: Set array based values
        vertex: [0.0, 0.6, 10.0],
      },
      [PLAYER.PLAYER_2]: {
        edge: [8.0, 0.2, 0.0],
        hackBot: 'orange', // TODO: Set array based values
        vertex: [8.0, 0.4, 0.0],
      },
    },
    selectedPlayer: PLAYER.PLAYER_1,

    // Actions
    updateSelectedPlayer: (player: keyof typeof PLAYER) => {
      set({
        selectedPlayer: player,
      });
    }
  };
});
