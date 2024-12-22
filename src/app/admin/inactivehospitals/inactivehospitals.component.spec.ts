import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivehospitalsComponent } from './inactivehospitals.component';

describe('InactivehospitalsComponent', () => {
  let component: InactivehospitalsComponent;
  let fixture: ComponentFixture<InactivehospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactivehospitalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivehospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
