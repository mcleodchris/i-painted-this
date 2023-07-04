import { Routes } from '@angular/router';
import { EntryTableComponent } from '../components/entry-table/entry-table.component';
const currentYear = new Date().getFullYear();
const routeConfig: Routes = [
  {
    path: 'year/:year',
    component: EntryTableComponent,
  },
  { path: '', redirectTo: `/year/${currentYear}`, pathMatch: 'full' },
];

export default routeConfig;
