import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SpsManagementFacade } from './services/sps-management.facade';

@Injectable({
  providedIn: 'root',
})
export class SpsManagementResolver implements Resolve<void> {
  store = inject(SpsManagementFacade);

  resolve(): void {
    this.store.load();
  }
}