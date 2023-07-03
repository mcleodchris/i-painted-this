import { Component, Input, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Entry } from '../entry';
import { YearNavigationComponent } from '../year-navigation/year-navigation.component';
import { EntriesService } from '../entries.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css'],
  imports: [CommonModule, RouterModule, YearNavigationComponent],
  standalone: true,
})
export class EntryTableComponent {
  entriesService: EntriesService = inject(EntriesService);
  data: Observable<Entry[]> = new Observable<Entry[]>();
  entries: Observable<Entry[]> = new Observable<Entry[]>();
  route: ActivatedRoute = inject(ActivatedRoute);
  cumulative: number = 0;

  constructor() {
    // this.route.params.subscribe(async (params) => {
    //   if (params['year'] === 'all') {
    //     this.entriesService.getAllEntries().then((entries) => (this.entries = entries));
    //   } else {
    //     const year = params['year'] ? Number(params['year']) : new Date().getFullYear();
    //     this.entriesService.getEntriesByYear(year).then((entries) => {
    //       this.entries = entries;
    //     });
    //   }
    // });
  }

  onNgInit() {
    this.data = this.entriesService.entries;
    //this.entriesService.loadAll();

    this.entries = this.data.pipe(
      map((entries) =>
        entries.map((entry) => {
          entry.cumulative = this.cumulative + entry.modelCount;
          return entry;
        })
      ),
      map((entries) => {
        console.table(this.entries);
        return entries;
      })
    );

    console.table(this.entries);
    // this.route.params.subscribe(async (params) => {
    //   if (params['year'] === 'all') {
    //     //this.entriesService.getAllEntries().then((entries) => (this.entries = entries));
    //     this.entries = this.data;
    //   } else {
    //     const year = params['year'] ? Number(params['year']) : new Date().getFullYear();
    //     this.entries = this.data.pipe(
    //       map((entries) => entries.filter((entry) => new Date(entry.completedDate).getFullYear() === year))
    //     );
    //     // this.entriesService.getEntriesByYear(year).then((entries) => {
    //     //   this.entries = entries;
    //     // });
    //   }
    // });
  }
}
