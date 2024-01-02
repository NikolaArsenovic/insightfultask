import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BulkEditModalComponent } from './bulk-edit-modal.component';
import { DialogData } from './dialog-data.model';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeEditFormComponent } from '../employee-edit-form/employee-edit-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TimeRangeValidatorDirective } from '../employee-edit-form/time-range-validator.directive';

const employeesMock: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'doe@gmail.com',
    hourlyRate: 10.0,
    hourlyRateOvertime: 20.0,
    shifts: [
      {
        employeeId: '1',
        id: '1',
        clockIn: new Date('2020-01-01T09:00:00').getTime(),
        clockOut: new Date('2020-01-01T12:00:00').getTime()
      },
      {
        employeeId: '1',
        id: '2',
        clockIn: new Date('2020-01-01T16:00:00').getTime(),
        clockOut: new Date('2020-01-01T22:00:00').getTime()
      },
      {
        employeeId: '1',
        id: '3',
        clockIn: new Date('2020-01-01T23:00:00').getTime(),
        clockOut: new Date('2020-01-02T01:00:00').getTime()
      },
    ]
  },
  {
    id: '2',
    name: 'John Doe 2',
    email: 'doe2@gmail.com',
    hourlyRate: 10.0,
    hourlyRateOvertime: 20.0,
    shifts: [
    {
      employeeId: '1',
      id: '4',
      clockIn: new Date('2020-01-10T23:00:00').getTime(),
      clockOut: new Date('2020-01-11T01:00:00').getTime()
    },
    {
      employeeId: '2',
      id: '4',
      clockIn: new Date('2020-01-01T09:00:00').getTime(),
      clockOut: new Date('2020-01-01T12:00:00').getTime()
    },
    {
      employeeId: '2',
      id: '5',
      clockIn: new Date('2020-01-01T16:00:00').getTime(),
      clockOut: new Date('2020-01-01T22:00:00').getTime()
    },
    {
      employeeId: '2',
      id: '6',
      clockIn: new Date('2020-01-01T23:00:00').getTime(),
      clockOut: new Date('2020-01-02T01:00:00').getTime()
    }
    ]
  }];

describe('BulkEditModalComponent', () => {
  let component: BulkEditModalComponent;
  let fixture: ComponentFixture<BulkEditModalComponent>;

  const data = {
  title: 'Bulk Edit',
  employees: employeesMock
  } as DialogData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, MatDialogModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [ BulkEditModalComponent, EmployeeEditFormComponent, TimeRangeValidatorDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkEditModalComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

