import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonvisitedappointmentsComponent } from './nonvisitedappointments.component';

describe('NonvisitedappointmentsComponent', () => {
  let component: NonvisitedappointmentsComponent;
  let fixture: ComponentFixture<NonvisitedappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonvisitedappointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonvisitedappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
