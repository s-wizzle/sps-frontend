import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'stone-paper-scissors',
    loadChildren: () =>
      import('@sps-frontend/feature-stone-paper-scissors').then((m) => m.stonePaperScissorsRoutes
      ),
  },
  {
    path: '**',
    redirectTo: 'stone-paper-scissors',
    pathMatch: 'full'
  }
];
