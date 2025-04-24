import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { GamesEntity } from '@sps-frontend/feature-stone-paper-scissors';

@Component({
  selector: 'stone-paper-scissors-table',
  template: `
    <p-table
      [value]="games"
      [paginator]="true"
      [rows]="10"
      responsiveLayout="scroll"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>ID</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Player Name</th>
          <th>Player Choice</th>
          <th>NPC Choice</th>
          <th>Result</th>
          <th>Mode</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-game>
        <tr>
          <td>{{ game.id }}</td>
          <td>{{ game.createdAt }}</td>
          <td>{{ game.updatedAt }}</td>
          <td>{{ game.playerName }}</td>
          <td>{{ game.playerChoice }}</td>
          <td>{{ game.npcChoice }}</td>
          <td>{{ game.result }}</td>
          <td>{{ game.mode }}</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [],
  standalone: true,
  imports: [TableModule],
})
export class SpsTableComponent {
  @Input() games: GamesEntity[] = [];
}
