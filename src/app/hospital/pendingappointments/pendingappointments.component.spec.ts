import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingappointmentsComponent } from './pendingappointments.component';

describe('PendingappointmentsComponent', () => {
  let component: PendingappointmentsComponent;
  let fixture: ComponentFixture<PendingappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingappointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
