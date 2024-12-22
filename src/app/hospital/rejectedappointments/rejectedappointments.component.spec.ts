import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedappointmentsComponent } from './rejectedappointments.component';

describe('RejectedappointmentsComponent', () => {
  let component: RejectedappointmentsComponent;
  let fixture: ComponentFixture<RejectedappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedappointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
