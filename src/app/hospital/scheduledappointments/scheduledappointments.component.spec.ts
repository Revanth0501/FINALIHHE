import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledappointmentsComponent } from './scheduledappointments.component';

describe('ScheduledappointmentsComponent', () => {
  let component: ScheduledappointmentsComponent;
  let fixture: ComponentFixture<ScheduledappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledappointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
