import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.scss']
})
export class LiveFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>
    ) {}

    ngOnInit(): void{
   }
   fechar(): void{
    this.dialogRef.close();
   }
}
