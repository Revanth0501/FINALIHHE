import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivepatientsComponent } from './inactivepatients.component';

describe('InactivepatientsComponent', () => {
  let component: InactivepatientsComponent;
  let fixture: ComponentFixture<InactivepatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactivepatientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivepatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
