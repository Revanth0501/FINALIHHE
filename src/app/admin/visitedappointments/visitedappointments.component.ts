import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitedappointments',
  imports: [CommonModule],
  templateUrl: './visitedappointments.component.html',
  styleUrl: './visitedappointments.component.css'
})
export class VisitedappointmentsComponent {
  constructor(private route:Router,private http:HttpClient){};
  appointments:any[]=[]

  ngOnInit()
  {
    this.getAppointments();
  }

  getAppointments():void
  {
    const apiUrl="http://43.205.181.183:5000/api/Admin/AppointmentsFetch"
    this.http.get<any []>(apiUrl).subscribe(
      (response) => 
      {
        this.appointments=response.filter(appointment => appointment.status === "Visited")
        .map(appointment => ({
          ...appointment, 
          appointmentId: appointment.appointmentId.toUpperCase()  
        }));
        console.log("Visited Appointments  : ",this.appointments);
      },
      (error) =>
      {
        console.log(error);
        alert("Failed to Get Appointments");
      }
    )
  }

  
  
  updateAppointmentData(id:String)
  {
    this.route.navigate(['updateappointmentdata/:id'])
  }
}
