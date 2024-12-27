import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateappointmentdataComponent } from './updateappointmentdata.component';

describe('UpdateappointmentdataComponent', () => {
  let component: UpdateappointmentdataComponent;
  let fixture: ComponentFixture<UpdateappointmentdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateappointmentdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateappointmentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
