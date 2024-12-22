import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivedoctorsComponent } from './inactivedoctors.component';

describe('InactivedoctorsComponent', () => {
  let component: InactivedoctorsComponent;
  let fixture: ComponentFixture<InactivedoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactivedoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivedoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
