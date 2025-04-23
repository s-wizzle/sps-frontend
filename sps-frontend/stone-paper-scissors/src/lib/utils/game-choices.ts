import { GAME_MODE } from '@sps-frontend/feature-stone-paper-scissors';

export type Choice = {
  label: string;
  icon: string;
};

export const gameChoices: Choice[] = [
  { label: 'stone', icon: 'assets/icon_lizard.png' },
  { label: 'paper', icon: 'assets/icon_paper.png' },
  { label: 'scissors', icon: 'assets/icon_scissors.png' },
  { label: 'lizard', icon: 'assets/icon_lizard.png' },
  { label: 'spock', icon: 'assets/icon_spock.png' },
  { label: 'fire', icon: 'assets/icon_fire.png' },
  { label: 'water', icon: 'assets/icon_water.png' },
];

export const modeChoicesMap: Record<GAME_MODE, string[]> = {
  0: ['stone', 'paper', 'scissors'],
  1: ['stone', 'paper', 'scissors', 'lizard', 'spock'],
  2: ['stone', 'paper', 'scissors', 'lizard', 'spock', 'fire', 'water'],
};

export function getIconForChoice(label: string, choices: Choice[]): string {
  return choices.find((c) => c.label === label)?.icon ?? '';
}
