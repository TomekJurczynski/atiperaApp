import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataTableComponent, DialogBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'atiperaApp';
}
