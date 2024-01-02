import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '../../core.module';
import { LayoutComponent } from './layout.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  const fakeActivatedRoute = {
    data: {
      title: 'Dashboard'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ LayoutComponent ],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
