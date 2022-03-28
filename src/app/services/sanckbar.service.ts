import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanckbarService {

  constructor(
    private sanckBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.sanckBar.open(message,action,{
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }
}
