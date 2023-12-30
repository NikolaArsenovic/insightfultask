import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Shift } from '../models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  private employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  private shifts: BehaviorSubject<Shift[]> = new BehaviorSubject<Shift[]>([]);

  load(): void {
     this.http.get<Employee[]>('employees').subscribe((employees) => {
      this.employees.next(employees);
     });

     this.http.get<Shift[]>('shifts').subscribe((shifts) => {
      this.shifts.next(shifts);
     });
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees.asObservable();
  }

  getShifts(): Observable<Shift[]> {
    return this.shifts.asObservable();
  }
}
