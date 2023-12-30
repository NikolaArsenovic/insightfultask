import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-employee-details-table',
  templateUrl: './employee-details-table.component.html',
  styleUrls: ['./employee-details-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsTableComponent implements OnInit{
  private employeeService = inject(EmployeeService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  employees: Employee[] = [];

  displayedColumns: string[] = ['select', 'name', 'email', 'clockedInTime', 'paidForRegularHours', 'paidForOvertimeHours'];
  selection = new SelectionModel<Employee>(true, []);

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.changeDetectorRef.detectChanges();
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.employees.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.employees);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
}
