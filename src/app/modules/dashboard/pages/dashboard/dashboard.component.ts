import { Component, inject } from '@angular/core';

import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private employeeService = inject(EmployeeService);

  employees$ = this.employeeService.getEmployees();
  shifts$ = this.employeeService.getShifts();
}
