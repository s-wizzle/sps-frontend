export enum Result {
    WIN = 'win',
    LOSS = 'loss',
    TIE = 'tie',
}

export enum GAME_MODE {
    DEFAULT= 'DEFAULT',
    HARD = 'HARD',
    EXPERT = 'EXPERT',
}
export interface GamesEntity {
    id: number;
    createdAt: string;
    updatedAt: string;
    playerName: string;
    playerChoice: string;
    npcChoice: string;
    result: Result;
    mode: GAME_MODE;
}