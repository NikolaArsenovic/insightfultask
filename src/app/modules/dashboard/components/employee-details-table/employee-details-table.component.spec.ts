import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { EmployeeDetailsTableComponent } from './employee-details-table.component';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

describe('EmployeeDetailsTableComponent', () => {
  let component: EmployeeDetailsTableComponent;
  let fixture: ComponentFixture<EmployeeDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsTableComponent ],
      imports: [ HttpClientModule, MatDialogModule, MatTableModule, MatCheckboxModule ],
      providers: [ EmployeeService, HttpClient ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
