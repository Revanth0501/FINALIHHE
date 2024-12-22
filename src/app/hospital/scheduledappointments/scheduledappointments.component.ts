import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scheduledappointments',
  imports: [CommonModule],
  templateUrl: './scheduledappointments.component.html',
  styleUrl: './scheduledappointments.component.css'
})
export class ScheduledappointmentsComponent {
  hospitalId:string='';
  http = inject(HttpClient);
  constructor(private router: Router,private sharedservice:SharedService) {
    this.hospitalId=sharedservice.getHospitalId();
  }
  scheduledAppointments:any[]=[];
  

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments()
  {
    const apiUrl=`https://localhost:7287/api/Hospital/Appointments?HospitalId=${this.hospitalId}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log(response);
        this.scheduledAppointments = response.filter(appointment => appointment.status === "Approved");
        console.log(this.scheduledAppointments);
      },
      (error) =>
      {
        console.error(error.message);
      }
    )
  }

  Update_Data(id: number): void {
    this.router.navigate(['/hospital/updateappointmentdata', id]);
  }
}
