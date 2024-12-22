import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingticketsComponent } from './pendingtickets.component';

describe('PendingticketsComponent', () => {
  let component: PendingticketsComponent;
  let fixture: ComponentFixture<PendingticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingticketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
