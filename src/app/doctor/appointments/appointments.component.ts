import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  todaysAppointments:any=[]
  doctorId: string = "";

  http=inject(HttpClient);
  constructor(private router: Router,sharedservice:SharedService) {
    this.doctorId=sharedservice.getDoctorId();
   }

  ngOnInit()
  {
    this.getAppointmentsData();
  }

  getAppointmentsData():void
  {
    const apiUrl=`https://localhost:7287/api/Doctor/doctorappointments?doctorId=${this.doctorId}`;
    this.http.get(apiUrl).subscribe((data:any)=>{
      this.todaysAppointments=data;
      console.log(this.todaysAppointments);
    });
    
  }

  onView(id: number): void {
    this.router.navigate(['/doctor/patientmedicaldata', id]);
  }
  
}
