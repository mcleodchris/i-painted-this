import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Entry } from '../entry';
import { EntriesService } from '../entries.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-year-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './year-navigation.component.html',
  styleUrls: ['./year-navigation.component.css'],
})
export class YearNavigationComponent implements OnInit {
  entriesService: EntriesService = inject(EntriesService);
  years: Observable<number[]> = new Observable<number[]>();
  route: ActivatedRoute = inject(ActivatedRoute);
  data: Observable<Entry[]> = new Observable<Entry[]>();
  entries: Entry[] = [];

  ngOnInit() {
    this.data = this.entriesService.entries;
    this.entriesService.loadAll();

    this.years = this.data.pipe(
      map((entries) => entries.map((entry) => new Date(entry.completedDate).getFullYear())),
      map((years) => years.filter((year, index, self) => self.indexOf(year) === index)),
      map((years) => years.sort((a, b) => b - a))
    );
  }
}
