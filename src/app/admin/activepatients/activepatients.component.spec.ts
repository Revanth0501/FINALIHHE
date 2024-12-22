import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivepatientsComponent } from './activepatients.component';

describe('ActivepatientsComponent', () => {
  let component: ActivepatientsComponent;
  let fixture: ComponentFixture<ActivepatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivepatientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivepatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
