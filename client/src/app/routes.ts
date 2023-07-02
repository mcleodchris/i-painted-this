import { Routes } from '@angular/router';
import { EntryTableComponent } from './entry-table/entry-table.component';
import { EntriesService } from './entries.service';

const routeConfig: Routes = [
  {
    path: '',
    component: EntryTableComponent,
    // providers: [EntriesService],
  },
  {
    path: 'year/:year',
    component: EntryTableComponent,
    // providers: [EntriesService],
  },
];

export default routeConfig;
