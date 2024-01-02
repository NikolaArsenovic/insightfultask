import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-edit-form',
  templateUrl: './employee-edit-form.component.html',
  styleUrls: ['./employee-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEditFormComponent implements OnInit {
  employeeService = inject(EmployeeService);

  @Input() employee?: Employee;
  @Input() dates: string[] = [];

  get shiftsFormArray(): FormArray {
    return this.shiftsForm.get('shifts') as FormArray;
  }

  selectedDate = '';

  employeeForm = new FormGroup({
                      name: new FormControl('', Validators.required),
                      regularRate: new FormControl( 0, Validators.required),
                      overtimeRate: new FormControl( 0, Validators.required),
                    });

  shiftsForm = new FormGroup({
    shifts: new FormArray([]),
  });

  ngOnInit(): void {
    if(this.employee) {
      this.employeeForm.patchValue({
        name: this.employee.name,
        regularRate: this.employee.hourlyRate,
        overtimeRate: this.employee.hourlyRateOvertime,
      });

      this.selectedDate = this.dates[0];
      this.addShiftsToForm();
    }
  }

  addShiftsToForm(): void {
    if(!this.employee || !this.selectedDate) return;

    this.shiftsFormArray.clear();

    this.employeeService.getShiftsForDay(this.employee?.shifts, this.selectedDate).forEach((shift) => {
      this.shiftsFormArray.push(new FormGroup({
        shiftId: new FormControl(shift.id),
        clockIn: new FormControl({value: this.formatTime(shift.clockIn), disabled: this.isShiftTimeFromDifferentDay(shift.clockIn)}, Validators.required),
        clockOut: new FormControl({value: this.formatTime(shift.clockOut), disabled: this.isShiftTimeFromDifferentDay(shift.clockOut)}, Validators.required),
      }));
    });
  }

  calculateTotalTime(clockIn: string, clockOut: string, shiftId: string): string {
    const shift = this.employee?.shifts.find((shift) => shift.id === shiftId);
    if(!shift) return '00:00';

    const clockInDate = new Date(shift.clockIn).setHours(+clockIn.split(':')[0], +clockIn.split(':')[1]);
    const clockOutDate = new Date(shift.clockOut).setHours(+clockOut.split(':')[0], +clockOut.split(':')[1]);

    return this.employeeService.convertToHoursString(clockOutDate - clockInDate);
  }

  isShiftTimeFromDifferentDay(clockDateTime: number): boolean {
    const requestedDate = new Date(clockDateTime);
    const pickedDate = new Date(this.selectedDate);

    return requestedDate.getDate() !== pickedDate.getDate();
  }

  formatTime(time: number): string {
    const fullDate = new Date(time);
    return (fullDate.getHours().toString().length < 2 ? '0' + fullDate.getHours() : fullDate.getHours()) + ':'
         + (fullDate.getMinutes().toString().length < 2 ? '0' + fullDate.getMinutes() : fullDate.getMinutes());
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
