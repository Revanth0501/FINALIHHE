import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalprofileComponent } from './hospitalprofile.component';

describe('HospitalprofileComponent', () => {
  let component: HospitalprofileComponent;
  let fixture: ComponentFixture<HospitalprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
