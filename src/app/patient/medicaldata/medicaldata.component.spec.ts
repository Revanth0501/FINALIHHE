import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaldataComponent } from './medicaldata.component';

describe('MedicaldataComponent', () => {
  let component: MedicaldataComponent;
  let fixture: ComponentFixture<MedicaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicaldataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
