import { Injectable, inject } from '@angular/core';
import { Entry, EntriesResponse } from '../models/';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private http: HttpClient = inject(HttpClient);
  private _entries: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);
  private dataStore: { entries: Entry[] } = { entries: [] };
  readonly entries = this._entries.asObservable();
  private endpoint = '/data-api/graphql';

  loadAll() {
    this.http
      .post<EntriesResponse>(this.endpoint, {
        query: `
        {
            entries(orderBy: {completedDate: ASC }) {
                items {
                    id
                    item
                    game
                    modelCount
                    completedDate
                    createdAt
                }
            }
        }`,
      })
      .subscribe((data) => {
        this.dataStore.entries = data.data.entries.items;
        this._entries.next(Object.assign({}, this.dataStore).entries);
        console.log(this.dataStore.entries);
      });
  }

  years(): Observable<number[]> {
    return this.entries.pipe(
      map((entries) => entries.map((entry) => new Date(entry.completedDate).getFullYear())),
      map((years) => years.filter((year, index, self) => self.indexOf(year) === index)),
      map((years) => years.sort((a, b) => b - a))
    );
  }

  create(entry: Entry) {
    console.log(entry);
    this.dataStore.entries.push(entry);
    this._entries.next(Object.assign({}, this.dataStore).entries);
    console.table(this.entries);
    return entry;
  }
}
