import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SpsGameModel } from '../model/sps-game.model';

export interface SpsGameState extends EntityState<SpsGameModel> {
  status: string;
  error: string | null;
}
export const adapter: EntityAdapter<SpsGameModel> =
  createEntityAdapter<SpsGameModel>({
    selectId: (game: SpsGameModel) => game.id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
  });

export const initialSpsGameState = adapter.getInitialState({
    status: 'default',
    error: '',
});