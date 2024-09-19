// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { map } from 'rxjs/operators';
// import { Observable, ReplaySubject, of as observableOf, merge } from 'rxjs';

// export interface PeriodicElement {
//     name: string;
//     position: number;
//     weight: number;
//     symbol: string;
// }

// // TODO: replace this with real data from your application
// const ELEMENT_DATA: PeriodicElement[] = [
//     { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//     { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//     { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//     { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//     { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//     { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//     { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//     { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//     { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//     { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

// /**
//  * Data source for the DataTable view. This class should
//  * encapsulate all logic for fetching and manipulating the displayed data
//  * (including sorting, pagination, and filtering).
//  */
// export class DataTableDataSource extends DataSource<PeriodicElement> {
//     // private _dataStream = new ReplaySubject<PeriodicElement[]>();

//     // constructor(initialData: PeriodicElement[]) {
//     //     super();
//     //     this.setData(initialData);
//     // }

//     // connect(): Observable<PeriodicElement[]> {
//     //     return this._dataStream;
//     // }

//     // disconnect() { }

//     // setData(data: PeriodicElement[]) {
//     //     this._dataStream.next(data);
//     // }

//     data: PeriodicElement[] = ELEMENT_DATA;

//     constructor() {
//         super();
//     }

//     connect(): Observable<PeriodicElement[]> {
//         const dataMutations = [
//             observableOf(this.data)
//         ];

//         return merge(...dataMutations)
//             .pipe(map(() => {
//                 return this.data;
//             }));
//     }

//     applyFilter(data: PeriodicElement[]) {
//         const filterValue = (data.target as HTMLInputElement).value;
//         this.data.filter = filterValue.trim().toLowerCase();
//     }

//     disconnect(): void { }
// }
