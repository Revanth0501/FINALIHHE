import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivehospitalsComponent } from './activehospitals.component';

describe('ActivehospitalsComponent', () => {
  let component: ActivehospitalsComponent;
  let fixture: ComponentFixture<ActivehospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivehospitalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivehospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
