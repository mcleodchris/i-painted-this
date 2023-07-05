import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Entry } from '../../models';
import { YearNavigationComponent } from '../year-navigation/year-navigation.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntryService } from '../../services/entry.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css'],
  imports: [CommonModule, RouterModule, YearNavigationComponent, MatTableModule, MatProgressSpinnerModule],
  standalone: true,
})
export class EntryTableComponent implements OnInit {
  private entriesService: EntryService = inject(EntryService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private data: Observable<Entry[]> = new Observable<Entry[]>();
  entries$: Observable<Entry[]> = new Observable<Entry[]>();
  displayedColumns: string[] = ['game', 'item', 'modelCount', 'cumulative', 'completedDate'];

  private addCumulative(data: Observable<Entry[]>): Observable<Entry[]> {
    const cumulative = 0;

    return data.pipe(
      map((entries) =>
        entries.map((entry) => {
          entry.cumulative = cumulative + entry.modelCount;
          return entry;
        })
      )
    );
  }

  ngOnInit() {
    this.data = this.entriesService.entries;
    this.entriesService.loadAll();

    this.route.params.subscribe(async (params) => {
      if (params['year'] === 'all') {
        this.entries$ = this.addCumulative(this.data);
      } else {
        const year = params['year'] ? Number(params['year']) : new Date().getFullYear();
        this.entries$ = this.addCumulative(
          this.data.pipe(
            map((entries) => entries.filter((entry) => new Date(entry.completedDate).getFullYear() === year))
          )
        );
      }
    });
  }
}
