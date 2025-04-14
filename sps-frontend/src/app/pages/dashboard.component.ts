import { Component } from '@angular/core';
import { DashboardItemComponent } from '../components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'dashboard-page',
  standalone: true,
  template: `
    <div class="dashboard-container">
      <dashboard-item
        [title]="'The Settlers of Catan'"
        [description]="
          'A modern classic board game: trade resources and build settlements.'
        "
      />
      <dashboard-item
        [title]="'Carcassone'"
        [description]="
          'Lay tiles, build cities, and become ruler of the medieval landscape.'
        "
        [iconRef]="'assets/images/carcassonne.png'"
      />
      <dashboard-item
        [title]="'Stone-Paper-Sciccors'"
        [description]="
          'Simple hand game of chance and psychology, perfect for quick decisions.'
        "
        [iconRef]="'assets/images/sps-card.jpg'"
      />
      <dashboard-item
        [title]="'Dungeons and Dragons'"
        [description]="
          'Epic fantasy role-playing adventure with storytelling and dice-based decisions.'
        "
        [iconRef]="'assets/images/dod.jpg'"
      />
      <dashboard-item
        [title]="'Monopoly'"
        [description]="
          'Classic real estate trading game where strategy meets chance.'
        "
        [iconRef]="'assets/images/monopoly.png'"
      />
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: flex-start;
      }
    `,
  ],
  imports: [DashboardItemComponent],
})
export class DashboardComponent {}
