import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { DialogData } from './dialog-data.model';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { FormArray, FormGroup } from '@angular/forms';
import { Shift } from 'src/app/core/models/shift.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-edit-modal',
  templateUrl: './bulk-edit-modal.component.html',
  styleUrls: ['./bulk-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkEditModalComponent implements OnInit {
  employeeService = inject(EmployeeService);

  bulkForm = new FormGroup({
    employees: new FormArray([]),
  });

  saveButtonDisabled = false;

  get employeesFormArray(): FormArray {
    return this.bulkForm.get('employees') as FormArray;
  }

  constructor(public dialogRef: MatDialogRef<BulkEditModalComponent>,@Inject(DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    if(this.data.employees) {
      this.addEmployeesToForm();
    }
  }

  getValuesToUpdate() {
    const employeesToUpdate: { id: string, name: string | undefined; hourlyRate: number | undefined; hourlyRateOvertime: number | undefined }[] = [];
    const shiftsToUpdate: {id: string; clockIn: number | undefined, clockOut: number | undefined}[] = [];

    const dirtyEditForms = this.bulkForm.controls['employees'].controls.filter((control: FormGroup) => control.dirty);

    dirtyEditForms.forEach((employeeForm: FormGroup) => {
      // employees
      const employee = employeeForm.controls['employee'] as FormGroup;
      if(employee.dirty) {

        const id = employee.controls['id'];
        const name = employee.controls['name'];
        const regularRate = employee.controls['regularRate'];
        const overtimeRate = employee.controls['overtimeRate'];

        employeesToUpdate.push({
          id: id.value,
          name: name.dirty ? name.value : undefined,
          hourlyRate: regularRate.dirty ? regularRate.value : undefined,
          hourlyRateOvertime: overtimeRate.dirty ? overtimeRate.value : undefined,
        });
      }

      // shifts
      const shiftsArray = (employeeForm.controls['shifts'] as FormGroup).controls['shiftsArray'] as FormArray;
      const dirtyShifts = shiftsArray.controls.filter((control) => control.dirty) as FormGroup[];


      dirtyShifts.forEach((shiftForm: FormGroup) => {

        const id = shiftForm.controls['id'];
        const employeeId = shiftForm.controls['employeeId'];
        const clockIn = shiftForm.controls['clockIn'];
        const clockOut = shiftForm.controls['clockOut'];

        shiftsToUpdate.push({
          id: id.value,
          clockIn: clockIn.dirty ? this.prepareTimeForUpdate(clockIn.value, employeeId.value, id.value, 'clockIn') : undefined,
          clockOut: clockOut.dirty ? this.prepareTimeForUpdate(clockOut.value, employeeId.value, id.value, 'clockOut') : undefined,
        });
      });
    });

    return {employeesToUpdate, shiftsToUpdate};
  }

  prepareTimeForUpdate(time: string, employeeId:string, shiftId: string, timeType: 'clockIn' | 'clockOut'): number {
    const timeArray = time.split(':');
    const hours = +timeArray[0];
    const minutes = +timeArray[1];

    const shift = this.data.employees?.find(emp => emp.id === employeeId)?.shifts.find((shift: Shift) => shift.id === shiftId);
      if(timeType === 'clockIn') {
        return new Date(shift?.clockIn || 0).setHours(hours, minutes);
      } else {
        return new Date(shift?.clockOut || 0).setHours(hours, minutes);
      }
  }


  addEmployeesToForm() {
    if(this.data.employees) {
      for(let i = 0; i < this.data.employees.length; i++) {
        this.employeesFormArray.push(new FormGroup({}));
      }
    }
  }

  getEmployeeForm(index: number): FormGroup {
    return this.employeesFormArray.controls[index] as FormGroup;
  }

  onCancel() {
    this.dialogRef.close();
  }
  onSubmit() {
    this.saveButtonDisabled = true;
    const values = this.getValuesToUpdate();
    this.employeeService.saveValues(values.employeesToUpdate, values.shiftsToUpdate);
    this.dialogRef.close();
  }
}
