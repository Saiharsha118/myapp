import { Routes } from '@angular/router';
import { Marketform } from './marketform/marketform';
import { DMAgroup } from './dmagroup/dmagroup';

export const routes: Routes = [
      { path: '', redirectTo: 'marketform', pathMatch: 'full' },
  { path: 'marketform', component: Marketform },
  { path: 'dma-group', component: DMAgroup },
];
