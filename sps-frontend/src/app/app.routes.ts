import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { SpsPageComponent } from './pages/sps-page.component';

export const appRoutes: Route[] = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'stone-paper-scissors',
    component: SpsPageComponent,
  },
];
