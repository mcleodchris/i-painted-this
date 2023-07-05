import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Entry } from '../../models';
import { v4 as uuid } from 'uuid';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
  providers: [FormBuilder],
})
export class EntryFormComponent {
  entriesService: EntryService = inject(EntryService);
  formBuilder: FormBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    item: ['', Validators.required],
    game: ['', Validators.required],
    modelCount: [0, Validators.required],
    completedDate: ['', Validators.required],
  });

  createFrom = new FormGroup({
    item: new FormControl('', Validators.required),
    game: new FormControl('', Validators.required),
    modelCount: new FormControl('', Validators.required),
    completedDate: new FormControl('', Validators.required),
  });

  get item() {
    return this.form.get('item');
  }
  get game() {
    return this.form.get('game');
  }
  get modelCount() {
    return this.form.get('modelCount');
  }
  get completedDate() {
    return this.form.get('completedDate');
  }

  onSubmit() {
    console.log(this.form.value);
    const entry: Entry = {
      item: String(this.form.value.item),
      game: String(this.form.value.game),
      modelCount: Number(this.form.value.modelCount),
      completedDate: `${this.form.value.completedDate}T00:00:00.000Z`,
      createdAt: new Date().toISOString(),
      id: uuid(),
    };
    this.entriesService.create(entry);
    this.form.reset();
  }
}
