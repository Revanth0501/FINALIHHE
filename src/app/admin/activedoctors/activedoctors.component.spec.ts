import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivedoctorsComponent } from './activedoctors.component';

describe('ActivedoctorsComponent', () => {
  let component: ActivedoctorsComponent;
  let fixture: ComponentFixture<ActivedoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivedoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivedoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
