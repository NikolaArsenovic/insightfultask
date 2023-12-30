import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { EmployeeDetailsTableComponent } from './components/employee-details-table/employee-details-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeDetailsTableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class DashboardModule { }
