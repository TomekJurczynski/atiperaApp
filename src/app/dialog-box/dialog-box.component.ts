import { Component, Inject, Optional, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../service/master.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBoxComponent implements OnInit, OnDestroy {
  action!: string;
  local_data: any;
  countries!: string[];
  cancel: string = 'Cancel';

  //tableForm!: FormGroup;

  inputdata: any;
  editdata: any;

  destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MasterService,
    private formBuilder: FormBuilder) {
    // this.creatForm();
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) {
      this.setPopupData(this.inputdata.code)
    }
  }

  setPopupData(code: number) {
    this.service.getDataByCode(code).pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.editdata = result;
      this.tableForm.setValue({
        name: this.editdata.name,
        weight: this.editdata.weight,
        symbol: this.editdata.symbol,
        id: this.editdata.id
      })
    });
  }

  // creatForm(): void {
  //   this.tableForm = this.formBuilder.group({
  //     name: [this.data.name, [Validators.required]],
  //     weight: [this.data.weight, [Validators.required]],
  //     symbol: [this.data.symbol, [Validators.required]],
  //   });
  // }


  closeDialog() {
    this.dialogRef.close();
  }

  tableForm = this.formBuilder.group({
    name: this.formBuilder.control(''),
    weight: this.formBuilder.control(''),
    symbol: this.formBuilder.control(''),
    id: this.formBuilder.control('')
  });

  onSubmit() {
    let obj = {
      name: this.editdata.name,
      weight: this.editdata.weight,
      symbol: this.editdata.symbol,
      id: this.editdata.id
    }

    if (JSON.stringify(obj) == JSON.stringify(this.tableForm.value)) {
      this.dialogRef.close();
    } else {
      this.service.saveData(this.tableForm.value, this.tableForm.value.id).pipe(takeUntil(this.destroy$)).subscribe(result => {
        this.closeDialog();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
