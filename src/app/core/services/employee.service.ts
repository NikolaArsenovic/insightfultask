import { BehaviorSubject, Observable, forkJoin, map, of, skip, take, zip } from 'rxjs';
import { Injectable, inject } from '@angular/core';

import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Shift } from '../models/shift.model';

const employeesMock: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'doe@gmail.com',
    hourlyRate: 10.0,
    hourlyRateOvertime: 20.0
  },
  {
    id: '2',
    name: 'John Doe 2',
    email: 'doe2@gmail.com',
    hourlyRate: 10.0,
    hourlyRateOvertime: 20.0
  }];

  const shiftsMock: Shift[] = [
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
  ];

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  private shiftsMap: BehaviorSubject<Map<string, Shift[]>> = new BehaviorSubject<Map<string, Shift[]>>(new Map<string, Shift[]>());

  private employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  private shifts: BehaviorSubject<Shift[]> = new BehaviorSubject<Shift[]>([]);
  private totalClockedInHours: BehaviorSubject<string> = new BehaviorSubject<string>('00:00:00');
  private totalRegularHoursPaid: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalOvertimeHoursPaid: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get employees$(): Observable<Employee[]> {
    return this.employees.asObservable();
  }

  get shifts$(): Observable<Shift[]> {
    return this.shifts.asObservable();
  }

  get totalClockedInHours$(): Observable<string> {
    return this.totalClockedInHours.asObservable();
  }

  get totalRegularHoursPaid$(): Observable<number> {
    return this.totalRegularHoursPaid.asObservable();
  }

  get totalOvertimeHoursPaid$(): Observable<number> {
    return this.totalOvertimeHoursPaid.asObservable();
  }

  get numberOfEmployees$(): Observable<number> {
    return this.employees.asObservable().pipe(
      map((employees) => employees.length)
    );
  }

  load(): void {
     const employees = this.http.get<Employee[]>('employees');
     const shifts = this.http.get<Shift[]>('shifts');
    forkJoin({employees, shifts}).subscribe(({employees, shifts}) => {

      // const shiftsMap = this.fillShiftsMap(employeesMock, shiftsMock);
      // this.calculateTotalPaymentForEmployees(employeesMock, shiftsMap);

      // this.employees.next(employeesMock);
      // this.shifts.next(shiftsMock);


      const shiftsMap = this.fillShiftsMap(employees, shifts);
      this.calculateTotalPaymentForEmployees(employees, shiftsMap);

      this.employees.next(employees);
      this.shifts.next(shifts);

    });
  }

  fillShiftsMap(employees: Employee[], shifts: Shift[]): Map<string, Shift[]> {

    const shiftsMap = new Map<string, Shift[]>();

    let i = 0;
    const len = employees.length;
    while (i < len) {
      const employeeShifts = shifts.filter((shift) => shift.employeeId === employees[i].id);
        shiftsMap.set(employees[i].id, employeeShifts);
        i++
    }

    this.shiftsMap.next(shiftsMap);

    return shiftsMap;
  }

  getDateOnly(time: number): string {
    return new Date(this.castTime(time).getFullYear(),this.castTime(time).getMonth(), this.castTime(time).getDate()).toLocaleDateString();
  }

  getUniqueDays(shifts: Shift[]): string[] {
    const clockedIn = shifts.map((shift) => shift.clockIn);
    const clockedOut = shifts.map((shift) => shift.clockOut);
    const totalDates = [...clockedIn, ...clockedOut];

    return [...new Set(totalDates.map((time) => this.getDateOnly(time)))];
  }

  calculatePaymentForRegularHours(hourlyRate: number, timeInMiliseconds: number): number {
    return timeInMiliseconds * this.getPaymentPerMilisecond(hourlyRate);
  }

  calculatePaymentForOvertimeHours(hourlyRateOvertime: number, timeInMiliseconds: number): number {
    return timeInMiliseconds * this.getPaymentPerMilisecond(hourlyRateOvertime);
  }

  calculateEmployeeDailyHours(employeeDayShifts: Shift[], day: string): { regularHours: number, overtimeHours: number } {
    let regularHours = 0;
    let overtimeHours = 0;

    // full day
    const startOfDay = new Date(day).setHours(0, 0, 0, 0);
    const endOfDay = new Date(day).setHours(24, 0, 0, 0);

    let totalHoursForDay = 0;

    for(let i = 0; i < employeeDayShifts.length; i++) {
      const clockedIn = employeeDayShifts[i].clockIn;
      const clockedOut = employeeDayShifts[i].clockOut;

      if(this.castTime(clockedIn).getDate() !== this.castTime(clockedOut).getDate()) {
        if(clockedIn < startOfDay) {
          // first shift of the day which cross over from previous day
          totalHoursForDay += (clockedOut - startOfDay);
        }

        if(clockedOut > endOfDay) {
          // last shift of the day which cross over to the next day
          totalHoursForDay += (endOfDay - clockedIn);
        }

      } else {
          // case when shift is in single day
          totalHoursForDay += (clockedOut - clockedIn);
      }
    }

    const regularShiftHours = this.convertHoursToMiliseconds(8);

    if(totalHoursForDay <= regularShiftHours) {
      // if the total hours for the day is less than 8 hours, then we have regular hours
      regularHours = regularHours + totalHoursForDay;
    } else {
      //if the total hours for the day is more than 8 hours, then we have overtime
      regularHours += regularShiftHours;
      overtimeHours += totalHoursForDay - regularShiftHours;
    }

    return { regularHours, overtimeHours };
  }

  convertToHoursString(time: number): string {
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.floor(time / 1000 / 60) - (hours * 60);
    const seconds = Math.floor(time / 1000) - (minutes * 60) - (hours * 60 * 60);
    return hours + ':' + minutes + ':' + seconds;
  }

  private calculateTotalPaymentForEmployees(employees: Employee[], shiftsMap:Map<string, Shift[]>) : void {
    let totalHours = 0;
    let totalOvertimeHours = 0;

    let regularPayment = 0;
    let overtimePayment = 0;

    const time = Date.now();

    let i = 0;
    const len = employees.length;
    while(i < len) {
      const employee = employees[i];
      const shiftsForEmployee = shiftsMap.get(employee.id);
      if(!shiftsForEmployee) return;

      const days = this.getUniqueDays(shiftsForEmployee);
      let totalHoursForEmployee = 0;
      let totalOvertimeHoursForEmployee = 0;

      let c = 0;
      const len = employees.length;
      while(c < len) {
        const day = days[c];
        // full day
        const startOfDay = new Date(day).setHours(0, 0, 0, 0);
        const endOfDay = new Date(day).setHours(24, 0, 0, 0);

        // get all shifts for the day

        const shiftsPerDay = shiftsForEmployee.filter((shift) => (shift.clockIn >= startOfDay && shift.clockIn <= endOfDay) || (shift.clockOut >= startOfDay && shift.clockOut <= endOfDay));
        const dailyHours = this.calculateEmployeeDailyHours(shiftsPerDay, day);

        // // adding daily hours to total hours
        totalHoursForEmployee += dailyHours.regularHours;
        totalOvertimeHoursForEmployee += dailyHours.overtimeHours;

        c++;
      }

      employee.clockedInTime = this.convertToHoursString(totalHoursForEmployee + totalOvertimeHoursForEmployee);
      employee.paidForRegularHours = this.calculatePaymentForRegularHours(employee.hourlyRate, totalHoursForEmployee);
      employee.paidForOvertimeHours = this.calculatePaymentForOvertimeHours(employee.hourlyRateOvertime, totalOvertimeHoursForEmployee);

      totalHours += totalHoursForEmployee;
      totalOvertimeHours += totalOvertimeHoursForEmployee;

      regularPayment += this.calculatePaymentForRegularHours(employee.hourlyRate, totalHoursForEmployee);
      overtimePayment += this.calculatePaymentForOvertimeHours(employee.hourlyRateOvertime, totalOvertimeHoursForEmployee);

      i++;
    }

    const testMil = Date.now() - time;
    console.log(testMil / 1000);


    this.totalClockedInHours.next(this.convertToHoursString(totalHours + totalOvertimeHours));
    this.totalRegularHoursPaid.next(regularPayment);
    this.totalOvertimeHoursPaid.next(overtimePayment);
  }

  private castTime(time: Date | number): Date {
    return new Date(time);
  }

  private convertHoursToMiliseconds(hours: number): number {
    return hours * 60 * 60 * 1000;
  }

  private getPaymentPerMilisecond(hourlyRate: number): number {
    return hourlyRate / this.convertHoursToMiliseconds(1);
  }
}
