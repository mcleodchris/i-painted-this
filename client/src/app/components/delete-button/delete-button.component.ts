import { Component, Input, inject } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Entry } from 'src/app/models';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [MatDialogModule, ConfirmationDialogComponent, MatButtonModule],
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css'],
})
export class DeleteButtonComponent {
  @Input() entry!: Entry;
  entryService: EntryService = inject(EntryService);
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(): void {
    console.log(`'Deleting' ${this.entry.id}`);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: this.entry,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Perform delete operation
        this.entryService.delete(this.entry.id);
        console.log(`'Deleted!' ${this.entry.id}`);
      }
    });
  }
}
