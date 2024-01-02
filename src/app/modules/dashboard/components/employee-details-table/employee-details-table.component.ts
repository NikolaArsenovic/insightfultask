import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';

import { BulkEditModalComponent } from '../bulk-edit-modal/bulk-edit-modal.component';
import { DialogData } from '../bulk-edit-modal/dialog-data.model';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-employee-details-table',
  templateUrl: './employee-details-table.component.html',
  styleUrls: ['./employee-details-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsTableComponent implements OnInit{
  @Output() selectedEmployees = new EventEmitter<Employee[]>();

  employeeService = inject(EmployeeService);
  changeDetectorRef = inject(ChangeDetectorRef);
  dialog = inject(MatDialog);

  employees: Employee[] = [];

  displayedColumns: string[] = ['select', 'name', 'email', 'clockedInTime', 'paidForRegularHours', 'paidForOvertimeHours'];
  selection = new SelectionModel<Employee>(true, []);

  ngOnInit(): void {
    this.employeeService.employees$.subscribe((employees) => {
      this.employees = employees;
      this.changeDetectorRef.detectChanges();
    });
  }

  toggleRow(employee: Employee) {
    this.selection.toggle(employee);
    this.selectedEmployees.emit(this.selection.selected);
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
      this.selectedEmployees.emit(this.selection.selected);
      return;
    }

    this.selection.select(...this.employees);
    this.selectedEmployees.emit(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  openDialog() {

    const data: DialogData = {
      title: 'Bulk Edit',
      employees: this.selection.selected
    };

    this.dialog.open(BulkEditModalComponent, {
      data
    });
  }
}
