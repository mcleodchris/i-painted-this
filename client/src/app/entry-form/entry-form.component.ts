import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Entry } from '../entry';
import { v4 as uuid } from 'uuid';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent {
  entriesService: EntriesService = inject(EntriesService);

  createFrom = new FormGroup({
    item: new FormControl('', Validators.required),
    game: new FormControl('', Validators.required),
    modelCount: new FormControl('', Validators.required),
    completedDate: new FormControl('', Validators.required),
  });

  get item() {
    return this.createFrom.get('item');
  }
  get game() {
    return this.createFrom.get('game');
  }
  get modelCount() {
    return this.createFrom.get('modelCount');
  }
  get completedDate() {
    return this.createFrom.get('completedDate');
  }

  constructor() {
    console.log(this.entriesService.id);
  }

  onSubmit() {
    const entry: Entry = {
      item: String(this.createFrom.value.item),
      game: String(this.createFrom.value.game),
      modelCount: Number(this.createFrom.value.modelCount),
      completedDate: new Date(String(this.createFrom.value.completedDate)).toISOString(),
      createdAt: new Date().toISOString(),
      id: uuid(),
    };
    console.log(entry);
    //this.entriesService.createEntry(entry);
  }
}
