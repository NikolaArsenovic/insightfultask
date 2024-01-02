import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Shift } from '../models/shift.model';
import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';

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
      id: '5',
      clockIn: new Date('2020-01-01T09:00:00').getTime(),
      clockOut: new Date('2020-01-01T12:00:00').getTime()
    },
    {
      employeeId: '2',
      id: '6',
      clockIn: new Date('2020-01-01T16:00:00').getTime(),
      clockOut: new Date('2020-01-01T22:00:00').getTime()
    },
    {
      employeeId: '2',
      id: '7',
      clockIn: new Date('2020-01-01T23:00:00').getTime(),
      clockOut: new Date('2020-01-02T01:00:00').getTime()
    }
  ]

  const employeesMock: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'doe@gmail.com',
      hourlyRate: 10.0,
      hourlyRateOvertime: 20.0,
      shifts: []
    },
    {
      id: '2',
      name: 'John Doe 2',
      email: 'doe2@gmail.com',
      hourlyRate: 10.0,
      hourlyRateOvertime: 20.0,
      shifts: []
    }];

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  let utilServiceMock: Partial<UtilService>;

  beforeEach(() => {
    utilServiceMock = {
      setSpinnerLoaderInProgress: jasmine.createSpy()
      // Add other methods as needed
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeService,
        { provide: UtilService, useValue: utilServiceMock }
      ]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('employees$ should return expected data', (done) => {
    service.load(); // Triggers the HTTP request

    const req = httpMock.expectOne('employees');
    expect(req.request.method).toBe('GET');
    req.flush(employeesMock);

    const req2 = httpMock.expectOne('shifts');
    expect(req2.request.method).toBe('GET');
    req2.flush(shiftsMock);


    service.employees$.subscribe((data) => {
      expect(data).toEqual(employeesMock);
      done();
    });

  });

  it('should calculate total clockedIn hours corectly', (done) => {
    service.load(); // Triggers the HTTP request

    const req = httpMock.expectOne('employees');
    req.flush(employeesMock);

    const req2 = httpMock.expectOne('shifts');
    req2.flush(shiftsMock);

    service.totalClockedInHours$.subscribe((data) => {
      expect(data).toEqual('22:00:00');
      done();
    });
  });

  it('should calculate total totalRegularHoursPaid corectly', (done) => {
    service.load(); // Triggers the HTTP request

    const req = httpMock.expectOne('employees');
    req.flush(employeesMock);

    const req2 = httpMock.expectOne('shifts');
    req2.flush(shiftsMock);

    service.totalRegularHoursPaid$.subscribe((data) => {
      expect(data).toEqual(180);
      done();
    });
  });

  it('should calculate total totalOvertimeHoursPaid corectly', (done) => {
    service.load(); // Triggers the HTTP request

    const req = httpMock.expectOne('employees');
    req.flush(employeesMock);

    const req2 = httpMock.expectOne('shifts');
    req2.flush(shiftsMock);

    service.totalOvertimeHoursPaid$.subscribe((data) => {
      expect(data).toEqual(80);
      done();
    });
  });

  it('should convert hours to string corectly', () => {
      const hoursInMiliseconds = 3601000;
      expect(service.convertToHoursString(hoursInMiliseconds)).toEqual('01:00:01');
  });

  it('should calculate employee daily hours corectly', () => {
    employeesMock[0].shifts = shiftsMock.filter(shift => shift.employeeId === '1');
    const days = service.getUniqueDays(employeesMock[0].shifts);
    expect(service.calculateEmployeeDailyHours(employeesMock[0].shifts, days[0])).toEqual({
      regularHours: 28800000,
      overtimeHours: 7200000
    });
  });

  it('expect getDateOnly to return date only string', () => {
    expect(service.getDateOnly(new Date('2020-01-01T12:00:00').getTime())).toEqual('1/1/2020');
  });

  it('expect setShiftsToEmployee to attach shifts to employee', () => {
    service.setShiftsToEmployee(employeesMock, shiftsMock);
    expect(employeesMock[0].shifts.length).toEqual(3);
    expect(employeesMock[1].shifts.length).toEqual(3);
  });

  it('expect setShiftsToEmployee to attach shifts to employee', () => {

    service.load(); // Triggers the HTTP request

    const empReq = httpMock.expectOne('employees');
    expect(empReq.request.method).toBe('GET');
    empReq.flush(employeesMock);

    const shiftReq = httpMock.expectOne('shifts');
    expect(shiftReq.request.method).toBe('GET');
    shiftReq.flush(shiftsMock);

    const shiftsToUpdate = [
      {
        id: '1',
        employeeId: '1',
        clockIn: new Date('2020-01-01T09:00:00').getTime(),
        clockOut: new Date('2020-01-01T12:00:00').getTime(),
      }
    ];

    const employeToUpdate = [
      {
        id: '1',
        name: 'John Doe',
        hourlyRate: 10.0,
        hourlyRateOvertime: 20.0,
      }
    ];

    service.saveValues(employeToUpdate, shiftsToUpdate);
    const req = httpMock.expectOne('employees/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(employeesMock[0]);

    const req2 = httpMock.expectOne('shifts/1');
    expect(req2.request.method).toBe('PATCH');
    req2.flush(shiftsMock[0]);

  });

  afterEach(() => {
    httpMock.verify(); // Make sure there are no outstanding requests
  });
});
