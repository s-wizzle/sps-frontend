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
      [globalFilterFields]="[
        'id',
        'createdAt',
        'updatedAt',
        'playerName',
        'playerChoice',
        'npcChoice',
        'result',
        'mode'
      ]"
    >
      <ng-template pTemplate="header">
        <tr>
          <th pSortableColumn="id">
            ID
            <p-sortIcon field="id" />
            <p-columnFilter
              field="id"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="numeric"
              placeholder="Filter ID"
            />
          </th>

          <th pSortableColumn="createdAt">
            Created At
            <p-sortIcon field="createdAt" />
            <p-columnFilter
              field="createdAt"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="date"
              placeholder="Filter Created At"
            />
          </th>

          <th pSortableColumn="updatedAt">
            Updated At
            <p-sortIcon field="updatedAt" />
            <p-columnFilter
              field="updatedAt"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="date"
              placeholder="Filter Updated At"
            />
          </th>

          <th pSortableColumn="playerName">
            Player Name
            <p-sortIcon field="playerName" />
            <p-columnFilter
              field="playerName"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="text"
              placeholder="Filter Player Name"
            />
          </th>

          <th pSortableColumn="playerChoice">
            Player Choice
            <p-sortIcon field="playerChoice" />
            <p-columnFilter
              field="playerChoice"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="text"
              placeholder="Filter Player Choice"
            />
          </th>

          <th pSortableColumn="npcChoice">
            NPC Choice
            <p-sortIcon field="npcChoice" />
            <p-columnFilter
              field="npcChoice"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="text"
              placeholder="Filter NPC Choice"
            />
          </th>

          <th pSortableColumn="result">
            Result
            <p-sortIcon field="result" />
            <p-columnFilter
              field="result"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="text"
              placeholder="Filter Result"
            />
          </th>

          <th pSortableColumn="mode">
            Mode
            <p-sortIcon field="mode" />
            <p-columnFilter
              field="mode"
              display="menu"
              showFilterMenu="true"
              showFilterOperator="false"
              type="text"
              placeholder="Filter Mode"
            />
          </th>
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
