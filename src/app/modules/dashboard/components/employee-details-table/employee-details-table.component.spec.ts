import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsTableComponent } from './employee-details-table.component';

describe('EmployeeDetailsTableComponent', () => {
  let component: EmployeeDetailsTableComponent;
  let fixture: ComponentFixture<EmployeeDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsTableComponent ]
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
