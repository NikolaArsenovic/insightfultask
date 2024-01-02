import { BulkEditModalComponent } from './components/bulk-edit-modal/bulk-edit-modal.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EmployeeDetailsTableComponent } from './components/employee-details-table/employee-details-table.component';
import { EmployeeEditFormComponent } from './components/employee-edit-form/employee-edit-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeRangeValidatorDirective } from './components/employee-edit-form/time-range-validator.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeDetailsTableComponent,
    BulkEditModalComponent,
    EmployeeEditFormComponent,
    TimeRangeValidatorDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class DashboardModule { }
