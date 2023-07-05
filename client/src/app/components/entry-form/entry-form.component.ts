import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Entry } from '../../models';
import { v4 as uuid } from 'uuid';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
  providers: [FormBuilder, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class EntryFormComponent {
  entriesService: EntryService = inject(EntryService);
  formBuilder: FormBuilder = inject(FormBuilder);

  form = this.formBuilder.nonNullable.group({
    item: ['', Validators.required],
    game: ['', Validators.required],
    modelCount: [1, [Validators.required, Validators.min(1)]],
    completedDate: [new Date(), Validators.required],
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
      completedDate: this.form.value.completedDate?.toISOString() ?? new Date().toISOString(),
      createdAt: new Date().toISOString(),
      id: uuid(),
    };
    //this.entriesService.create(entry);
    this.form.reset();
  }
}
