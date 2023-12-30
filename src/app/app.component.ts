import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { EmployeeService } from './core/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeService.load();
  }
}
