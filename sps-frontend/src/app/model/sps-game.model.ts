export enum Choice {
  STONE = 'stone',
  PAPER = 'paper',
  SCISSORS = 'scissors',
}

export enum Result {
  WIN = 'win',
  LOSS = 'loss',
  TIE = 'tie',
}

export type SpsGameModel = {
  id: number;
  createdAt: string;
  updatedAt: string;
  playerName: string;
  playerChoice: Choice;
  npcChoice: Choice;
  result: Result;
};