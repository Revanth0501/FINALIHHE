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
  scheduledAppointments:any=[]
  doctorId: string = "";

  http=inject(HttpClient);
  constructor(private router: Router,sharedservice:SharedService) {
    this.doctorId=sharedservice.getDoctorId();
   }

  ngOnInit()
  {
    this.getAppointmentsData();
  }

  getAppointmentsData(): void {
    const apiUrl = `http://43.205.181.183:5000/api/Doctor/doctorappointments?doctorId=${this.doctorId}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      console.log(data);
      const today = new Date().toISOString().split('T')[0];
      this.todaysAppointments = data.filter((appointment: any) => {
        return appointment.appointmentDate === today;
      });
      this.scheduledAppointments = data.filter((appointment: any) => {
        return appointment.appointmentDate > today;
      });
      console.log(this.todaysAppointments);
    }, (error) => {
      console.error('Error fetching appointments:', error);
    });
  }
  
  onView(id: number): void {
    this.router.navigate(['/doctor/patientmedicaldata', id]);
  }

  updateAppointment(id : string)
  {
    this.router.navigate(['/doctor/updateappointment',id])
  }
  
}
