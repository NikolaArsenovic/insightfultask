import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Renderer2 } from '@angular/core';

import { By } from '@angular/platform-browser';
import { EmployeeEditFormComponent } from './employee-edit-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TimeRangeValidatorDirective } from './time-range-validator.directive';

describe('TimeRangeValidatorDirective', () => {
  let component: EmployeeEditFormComponent;
  let fixture: ComponentFixture<EmployeeEditFormComponent>;
  let inputEl: DebugElement;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      declarations: [EmployeeEditFormComponent, TimeRangeValidatorDirective]
    });

    fixture = TestBed.createComponent(EmployeeEditFormComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);
  });

  it('should create an instance', () => {
    const directive = new TimeRangeValidatorDirective(inputEl, renderer);
    expect(directive).toBeTruthy();
  });

  it('should format time correctly', () => {
    const directive = new TimeRangeValidatorDirective(inputEl, renderer);
    expect(directive.formatTime(5, 9)).toBe('05:09');
    expect(directive.formatTime(12, 30)).toBe('12:30');
  });

});
