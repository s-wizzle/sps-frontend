import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StonePaperScissorsFacade } from './store/stone-paper-scissors.facade';

@Injectable({
  providedIn: 'root',
})
export class SpsManagementResolver implements Resolve<void> {
  store = inject(StonePaperScissorsFacade);

  resolve(): void {
    this.store.load();
  }
}