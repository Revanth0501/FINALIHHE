import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rejectedappointments',
  imports: [CommonModule],
  templateUrl: './rejectedappointments.component.html',
  styleUrl: './rejectedappointments.component.css'
})
export class RejectedappointmentsComponent {
  hospitalId:string='';
  http = inject(HttpClient);
  constructor(private router: Router,private sharedservice:SharedService) {
    this.hospitalId=sharedservice.getHospitalId();
  }
  rejectedAppointments:any[]=[];
  

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments()
  {
    const apiUrl=`https://localhost:7287/api/Hospital/Appointments?HospitalId=${this.hospitalId}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log(response);
        this.rejectedAppointments = response.filter(appointment => appointment.status === "Rejected");
        console.log(this.rejectedAppointments);
      },
      (error) =>
      {
        console.error(error.message);
      }

    )

  }
}