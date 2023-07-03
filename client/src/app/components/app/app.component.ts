import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EntryTableComponent } from '../entry-table/entry-table.component';
import { YearNavigationComponent } from '../year-navigation/year-navigation.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { EntryService } from '../../services/entry.service';
import { Entry } from '../../models/entry';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EntryTableComponent, RouterModule, CommonModule, YearNavigationComponent, EntryFormComponent],
  standalone: true,
})
export class AppComponent {
  title = 'I Painted This';
  entriesService: EntryService = inject(EntryService);
  entries: Observable<Entry[]> = new Observable<Entry[]>();
}
