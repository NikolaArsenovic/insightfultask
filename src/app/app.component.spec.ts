import { ActivatedRoute, Router } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from "@angular/common/http";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const fakeActivatedRoute = {
    data: {
      title: 'Dashboard'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, CoreModule, ],
      declarations: [ AppComponent ],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
