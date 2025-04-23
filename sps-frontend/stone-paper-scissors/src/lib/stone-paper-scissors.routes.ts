import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { Route } from '@angular/router';
import { StonePaperScissorsEffects } from './store/stone-paper-scissors.effects';
import * as fromStonePaperScissors from './store/stone-paper-scissors.reducer';
import { StonePaperScissorsPageComponent } from './pages/stone-paper-scissors-page.component';
import { MessageService } from 'primeng/api';
import { NotificationService } from './services/notification.service';

export const stonePaperScissorsRoutes: Route[] = [
  {
    path: '',
    component: StonePaperScissorsPageComponent,
    providers: [
      provideState(
        fromStonePaperScissors.GAMES_FEATURE_KEY,
        fromStonePaperScissors.stonePaperScissorsReducer
      ),
      provideEffects(StonePaperScissorsEffects),
      MessageService,
      NotificationService,
    ],
  },
];
