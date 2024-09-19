import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../data-table/data-table.component';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  GetData(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>("http://localhost:3000/periodicelement");
  }

  Savedata(data: any, code: any) {
    return this.http.patch("http://localhost:3000/periodicelement/" + code, data);
  }

  GetDataByCode(code: any) {
    return this.http.get("http://localhost:3000/periodicelement/" + code);
    //return console.log(code);
  }
}
