import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastappointmentsComponent } from './pastappointments.component';

describe('PastappointmentsComponent', () => {
  let component: PastappointmentsComponent;
  let fixture: ComponentFixture<PastappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastappointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
