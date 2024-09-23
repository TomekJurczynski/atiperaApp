import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../periodic-element';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: 'edit' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', action: 'edit' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', action: 'edit' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', action: 'edit' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', action: 'edit' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', action: 'edit' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', action: 'edit' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', action: 'edit' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', action: 'edit' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', action: 'edit' },
  ];

  getData(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>("http://localhost:3000/periodicelement");
  }

  saveData(data: any, code: any) {
    return this.http.patch("http://localhost:3000/periodicelement/" + code, data);
  }

  getDataByCode(code: any) {
    return this.http.get("http://localhost:3000/periodicelement/" + code);
    //return console.log(code);
  }
}
