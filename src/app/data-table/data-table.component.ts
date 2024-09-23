import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
//import { DataTableDataSource } from './data-table-datasource';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap, Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodicElement } from '../periodic-element';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, DialogBoxComponent, ReactiveFormsModule, CommonModule]
})
export class DataTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource$!: Observable<PeriodicElement[]>;
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  periodicElementList!: PeriodicElement[];
  //public filter = new FormControl('');
  filterControl = new FormControl('');
  destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private service: MasterService
  ) {
    //this.updateRowData();
  }
  ngOnInit(): void {
    this.dataSource$ = this.filterControl.valueChanges.pipe(
      startWith(''),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((filterValue: any) => this.applyFilter(filterValue))
    );
  }


  applyFilter(filterValue: string): Observable<PeriodicElement[]> {
    //console.log('data z getdata', this.service.GetData())
    const filteredData$: Observable<PeriodicElement[]> = this.service.getData().pipe(filter((element: PeriodicElement[]) =>
      Object.values(element)
        .join(' ')
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    ));
    console.log(filterValue, "filterValue 69");
    console.log(filteredData$, "filteredData$ 70");
    return filteredData$;

    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editData(code: number) {
    //console.log(code)
    this.openEditDialog(code, "Edit data");
  }

  openEditDialog(code: number, title: string): void {
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

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((_) => this.updateRowData());
  }

  updateRowData() {
    this.service.getData().pipe(takeUntil(this.destroy$)).subscribe(result => {

      this.periodicElementList = result;
      //console.log(result, '100')
      //this.dataSource = new MatTableDataSource<PeriodicElement>(this.periodicElementList);
      //this.filterControl.setValue(this.filterControl.value);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}