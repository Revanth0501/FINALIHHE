import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientmedicaldataComponent } from './patientmedicaldata.component';

describe('PatientmedicaldataComponent', () => {
  let component: PatientmedicaldataComponent;
  let fixture: ComponentFixture<PatientmedicaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientmedicaldataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientmedicaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
