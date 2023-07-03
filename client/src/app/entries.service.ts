import { Injectable, inject } from '@angular/core';
import { Entry } from './entry';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private http: HttpClient = inject(HttpClient);
  private _entries: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);
  private dataStore: { entries: Entry[] } = { entries: [] };
  readonly entries = this._entries.asObservable();
  private endpoint: string = '/data-api/graphql';
  private years: Observable<number[]> = new Observable<number[]>();

  id: string = uuid();

  constructor() {}

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

  getYears(): Observable<number[]> {
    if (!this._entries) {
      console.log(`no entries loaded, loading now`);
      this.loadAll();
    }
    return this.entries.pipe(
      map((entries: Entry[]) =>
        entries
          .map((entry) => new Date(entry.completedDate).getFullYear())
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => b - a)
      )
    );
  }

  // async loadAllEntries(): Promise<void> {
  //   const query = `
  //       {
  //           entries(orderBy: {completedDate: ASC }) {
  //               items {
  //                   id
  //                   item
  //                   game
  //                   modelCount
  //                   completedDate
  //                   createdAt
  //               }
  //           }
  //       }`;
  //   const response = await fetch(this.endpoint, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ query: query }),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .catch((error) => console.error(error));

  //   this.entries = response.data.entries.items;
  // }

  // async loadByYear(year: number): Promise<Entry[]> {
  //   const query = `
  //       {
  //           entries(filter: {completedDate: {gte: "${year}-01-01", lt: "${year + 1}-01-01"}}) {
  //               items {
  //                   id
  //                   item
  //                   game
  //                   modelCount
  //                   completedDate
  //                   createdAt
  //               }
  //           }
  //       }`;
  //   const response = await fetch(this.endpoint, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ query: query }),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .catch((error) => console.error(error));
  //   console.table(response.data.entries.items);
  //   return response.data.entries.items;
  // }

  // async getAllEntries(): Promise<Entry[]> {
  //   await this.loadAllEntries();
  //   return this.addCumulative(this.entries);
  // }

  // async getEntriesByYear(year: number): Promise<Entry[]> {
  //   const entries = this.entries.filter((entry) => {
  //     const entryDate = new Date(entry.completedDate);
  //     return entryDate.getFullYear() === year;
  //   });
  //   return this.addCumulative(entries);
  // }

  // getEntry(id: string): Entry | undefined {
  //   return this.entries.find((entry) => entry.id === id);
  // }

  // addCumulative(entries: Entry[]): Entry[] {
  //   let cumulative: number = 0;
  //   return entries.map((entry: Entry) => {
  //     cumulative += entry.modelCount;
  //     return { ...entry, cumulative };
  //   });
  // }

  // async createEntry(entry: Entry): Promise<Entry> {
  //   console.log(entry);
  //   this.entries.push(entry);
  //   console.table(this.entries);
  //   return entry;
  // }
}

interface EntriesResponse {
  data: {
    entries: {
      items: Entry[];
    };
  };
}
