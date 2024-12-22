import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedappointmentsComponent } from './visitedappointments.component';

describe('VisitedappointmentsComponent', () => {
  let component: VisitedappointmentsComponent;
  let fixture: ComponentFixture<VisitedappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitedappointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitedappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
