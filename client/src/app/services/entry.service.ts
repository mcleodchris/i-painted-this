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
    this.http
      .post<{ data: { createEntry: Entry } }>(this.endpoint, {
        query: `
        mutation {
            createEntry(item: {
                id: "${entry.id}"
                item: "${entry.item}"
                game: "${entry.game}"
                modelCount: ${entry.modelCount}
                completedDate: "${entry.completedDate}"
                createdAt: "${entry.createdAt}"
              }) {
                id
                item
                game
                modelCount
                completedDate
                createdAt
            }
        }`,
      })
      .subscribe((data) => {
        this.dataStore.entries.push(data.data.createEntry);
        this._entries.next(Object.assign({}, this.dataStore).entries);
      });
  }

  delete(id: string) {
    this.http
      .post<{ data: { deleteEntry: Entry } }>(this.endpoint, {
        query: `
        mutation delete($id: ID!, $_partitionKeyValue: String!) {
            deleteEntry(id: $id, _partitionKeyValue: $_partitionKeyValue) {
                id
            }
        }`,
        variables: {
          id: id,
          _partitionKeyValue: id,
        },
      })
      .subscribe((data) => {
        console.log(data);
        this.dataStore.entries.forEach((entry, index) => {
          if (entry.id === id) {
            this.dataStore.entries.splice(index, 1);
          }
        });
        this._entries.next(Object.assign({}, this.dataStore).entries);
      });
  }
}
