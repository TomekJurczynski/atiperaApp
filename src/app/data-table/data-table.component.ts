import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
//import { DataTableDataSource } from './data-table-datasource';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, Observable, switchMap } from 'rxjs';
//import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MasterService } from '../service/master.service';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: string;
}

// TODO: replace this with real data from your application
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: 'edit' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', action: 'edit' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', action: 'edit' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', action: 'edit' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', action: 'edit' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', action: 'edit' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', action: 'edit' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', action: 'edit' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', action: 'edit' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', action: 'edit' },
// ];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, DialogBoxComponent]
})
export class DataTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource: any;
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  periodicElementList!: PeriodicElement[];
  //public filter = new FormControl('');

  constructor(
    private dialog: MatDialog,
    private service: MasterService
  ) {
    this.updateRowData();
  }

  // FILTROWANIE KTORE TRZEBA ZMIENIC !!!
  applyFilter(event: Event) {
    //var observable = Rx.Observable.fromEvent
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editData(code: any) {
    //console.log(code)
    this.openEditDialog(code, "Edit data");
  }

  openEditDialog(code: any, title: any): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '40%',
      height: '400px',
      data: {
        code: code,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateRowData();
    });
  }

  updateRowData() {
    this.service.GetData().subscribe(result => {
      this.periodicElementList = result;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.periodicElementList);
    })
  }
}

// export class DataTableComponent implements AfterViewInit {

//   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
//   displayedColumns = ['position', 'name', 'weight', 'symbol'];
//   dataSource!: DataTableDataSource;
//   //dataSource!: DataTableDataSource;

//   ngAfterViewInit() {
//     this.dataSource = new DataTableDataSource();
//   }

//   // applyFilter(event: Event) {
//   //   const filterValue = (event.target as HTMLInputElement).value;
//   //   this.dataSource.filter = filterValue.trim().toLowerCase();
//   // }
// }
