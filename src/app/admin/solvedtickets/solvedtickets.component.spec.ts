import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedticketsComponent } from './solvedtickets.component';

describe('SolvedticketsComponent', () => {
  let component: SolvedticketsComponent;
  let fixture: ComponentFixture<SolvedticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolvedticketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolvedticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
