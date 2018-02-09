import { Component } from '@angular/core';

@Component({
  selector: 'bv-loader',
  template: `
    <div class="loader">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .loader {
      width: 100%;
      text-align: center;
    }
    .loader > mat-spinner {
      margin: 1.6em auto;
    }
  `]
})
export class LoaderComponent {}
