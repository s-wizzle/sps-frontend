import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Router } from '@angular/router';
import {Button} from "primeng/button";

@Component({
  selector: 'dashboard-page',
  standalone: true,
  template: `
    <p-card [style]="{ width: '25rem', overflow: 'hidden' }">
      <ng-template #header>
        <img
          alt="Card"
          class="w-full"
          src="https://primefaces.org/cdn/primeng/images/card-ng.jpg"
        />
      </ng-template>
      <ng-template #title> Advanced Card </ng-template>
      <ng-template #subtitle> Card subtitle </ng-template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
      <ng-template #footer>
        <div class="flex gap-4 mt-1">
          <p-button
            label="Cancel"
            severity="secondary"
            class="w-full"
            [outlined]="true"
            styleClass="w-full"
          />
          <p-button label="Save" class="w-full" styleClass="w-full" />
        </div>
      </ng-template>
    </p-card>
  `,
  styles: [],
  imports: [Card, Button],
})
export class DashboardComponent {
  tiles = [
    {
      title: 'Benutzer',
      subtitle: 'Verwaltung',
      description: 'Hier kannst du Benutzer verwalten.',
      route: '/benutzer',
    },
    {
      title: 'Berichte',
      subtitle: 'Auswertung',
      description: 'Greife auf Berichte und Statistiken zu.',
      route: '/berichte',
    },
    {
      title: 'Einstellungen',
      subtitle: 'System',
      description: 'Passe die Anwendung an deine Bedürfnisse an.',
      route: '/einstellungen',
    },
    {
      title: 'Support',
      subtitle: 'Hilfe & Feedback',
      description: 'Kontakt zum Support oder Feedback geben.',
      route: '/support',
    },
  ];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
