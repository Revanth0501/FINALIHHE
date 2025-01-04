import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-pastappointments',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './pastappointments.component.html',
  styleUrl: './pastappointments.component.css'
})
export class PastappointmentsComponent {

  past_appointments:any=[];
  patientId:number=0;
  constructor(private http: HttpClient,private sharedservice:SharedService) {
    this.patientId=this.sharedservice.getPatientId();
   }

  ngOnInit(): void {
    this.appointmentsFetch()
  }

  
  appointmentsFetch(): void {
    const apiUrl = `http://43.205.181.183:5000/api/Patient/AppointmentsFetch?PatientId=${this.patientId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.past_appointments=response.filter(
          (appointment:{status:string;appointmentDate:string}) =>
            appointment.status ?.trim().toLowerCase() === "approved" && 
          new Date(appointment.appointmentDate) < new Date()
        )
        this.past_appointments.sort((a:any, b:any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
        console.log("Pending Appointments : ",this.past_appointments);
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        alert('Failed to Fetch Appointments. Please try again later.');
      }
    });
}
}

