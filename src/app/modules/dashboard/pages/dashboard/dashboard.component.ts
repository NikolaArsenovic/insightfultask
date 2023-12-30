import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private employeeService = inject(EmployeeService);

  employees$ = this.employeeService.employees$;
  numberOfEmployees$ = this.employeeService.numberOfEmployees$;
  totalClockedInHours$ = this.employeeService.totalClockedInHours$;
  totalRegularHoursPaid$ = this.employeeService.totalRegularHoursPaid$;
  totalOvertimeHoursPaid$ = this.employeeService.totalOvertimeHoursPaid$;


}
