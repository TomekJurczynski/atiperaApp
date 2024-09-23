import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Observable, startWith, switchMap, Subject, takeUntil, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
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
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource$!: Observable<PeriodicElement[]>;
  periodicElementList!: PeriodicElement[];
  filterControl = new FormControl('');
  destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private service: MasterService
  ) { }

  ngOnInit(): void {
    this.updateRowData();
  }

  ngAfterViewInit(): void {
    this.filterControl.valueChanges.pipe(
      startWith(''),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((filterValue: any) => this.applyFilter(filterValue))
    ).subscribe((data: PeriodicElement[]) => this.dataSource$ = of(data));
  }


  applyFilter(filterValue: string): Observable<PeriodicElement[]> {
    const filteredData$ = this.service.ELEMENT_DATA.filter((element) =>
      Object.values(element)
        .join(' ')
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
    return of(filteredData$);
  }

  editData(element: PeriodicElement) {
    this.openEditDialog(element);
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '40%',
      height: '400px',
      data: { ...element }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result) {
        const isChanged = JSON.stringify(element) !== JSON.stringify(result);

        if (isChanged) {
          this.service.ELEMENT_DATA = this.service.ELEMENT_DATA.map((el: PeriodicElement) =>
            el.position === element.position ? result : el
          );

          const currentFilter = this.filterControl.value || '';
          this.dataSource$ = this.applyFilter(currentFilter);
          this.filterControl.setValue(currentFilter);
        }
      }
    });
  }

  updateRowData() {
    this.dataSource$ = of(this.service.ELEMENT_DATA);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}