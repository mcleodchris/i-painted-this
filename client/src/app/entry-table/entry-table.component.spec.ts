import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryTableComponent } from './entry-table.component';

describe('EntryTableComponent', () => {
  let component: EntryTableComponent;
  let fixture: ComponentFixture<EntryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryTableComponent],
      providers: [
        {
          provide: 'EntriesService',
          useValue: {
            getAllEntries: () => {
              //return a promise of an array of Entry objects
              return Promise.resolve([
                {
                  id: '1',
                  item: 'item1',
                  game: 'game1',
                  modelCount: 1,
                  completedDate: '2021-01-01',
                  createdAt: '2021-01-01',
                  cumulative: 1,
                },
                {
                  id: '2',
                  item: 'item2',
                  game: 'game2',
                  modelCount: 2,
                  completedDate: '2022-01-02',
                  createdAt: '2022-01-02',
                  cumulative: 3,
                },
                {
                  id: '3',
                  item: 'item3',
                  game: 'game3',
                  modelCount: 3,
                  completedDate: '2023-01-03',
                  createdAt: '2023-01-03',
                  cumulative: 6,
                },
              ]);
            },
            getEntriesByYear: (year: number) => {
              //return a promise of an array of Entry objects
              return Promise.resolve([
                {
                  id: '1',
                  item: 'item1',
                  game: 'game1',
                  modelCount: 1,
                  completedDate: '2021-01-01',
                  createdAt: '2021-01-01',
                  cumulative: 1,
                },
                {
                  id: '2',
                  item: 'item2',
                  game: 'game2',
                  modelCount: 2,
                  completedDate: '2021-01-02',
                  createdAt: '2021-01-02',
                  cumulative: 3,
                },
              ]);
            },
          },
        },
        {
          provide: 'ActivatedRoute',
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  return '2021';
                },
              },
            },
            param: {
              subscribe: (fn: (value: any) => void) => {
                fn({
                  year: '2021',
                });
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(EntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table with 5 columns', () => {
    const table = fixture.nativeElement.querySelector('table');
    const headerRow = table.rows[0];
    expect(headerRow.cells.length).toBe(5);
  });

  it('should have a table with 5 rows', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table.rows.length).toBe(5);
  });
});
