import { Routes } from '@angular/router';
import { EntryTableComponent } from '../components/entry-table/entry-table.component';

const routeConfig: Routes = [
  {
    path: '',
    component: EntryTableComponent,
  },
  {
    path: 'year/:year',
    component: EntryTableComponent,
  },
];

export default routeConfig;