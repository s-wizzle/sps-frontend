import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'dashboard-item',
  standalone: true,
  template: `
    <p-card class="card">
      <ng-template #header>
        <div class="card-header">
          @if (iconRef) {
          <img alt="Card" class="card-image" src="{{ iconRef }}" />
          } @else {
          <img
            alt="Card"
            class="card-image"
            src="assets/images/not-found.png"
          />
          }
        </div>
      </ng-template>
      <h4 class="text-muted">{{ title }}</h4>
      <p>
        {{ description }}
      </p>
      <ng-template #footer>
        <p-button label="Save" class="w-full" styleClass="w-full" />
      </ng-template>
    </p-card>
  `,
  styles: [
    `
      .card {
        width: 128px;
        height: 128px;
        overflow: hidden;
      }

      .card-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        max-width: 100px;
        max-height: 100px;
      }

      .card-header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50%;
        padding-top: 8px;
      }
    `,
  ],
  imports: [Card, Button],
})
export class DashboardItemComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() iconRef = '';
  route: string = 'someRoute';
}
