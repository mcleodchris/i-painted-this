import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Entry } from '../../models';
import { EntryService } from '../../services/entry.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-year-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './year-navigation.component.html',
  styleUrls: ['./year-navigation.component.css'],
})
export class YearNavigationComponent implements OnInit {
  entriesService: EntryService = inject(EntryService);
  years: Observable<number[]> = new Observable<number[]>();
  route: ActivatedRoute = inject(ActivatedRoute);
  data: Observable<Entry[]> = new Observable<Entry[]>();
  entries: Entry[] = [];

  ngOnInit() {
    this.years = this.entriesService.years();
  }
}
