import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-scheduledappointments',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './scheduledappointments.component.html',
  styleUrl: './scheduledappointments.component.css'
})
export class ScheduledappointmentsComponent {
  scheduled_appointments:any=[];
  patientId:number=0;
  constructor(private http: HttpClient,private sharedservice:SharedService) {
      this.patientId=sharedservice.getPatientId();
   }

  ngOnInit(): void {
    this.appointmentsFetch()
  }
  appointmentsFetch(): void {
    console.log("Svhedule Patient : ",this.patientId);
    const apiUrl = `https://localhost:7287/api/Patient/AppointmentsFetch?PatientId=${this.patientId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.scheduled_appointments = response.filter(
          (appointment: { status: string; appointmentDate: string }) =>
            appointment.status?.trim().toLowerCase() === "approved" &&
            new Date(appointment.appointmentDate) >= new Date()
        );
        this.scheduled_appointments.sort((a:any, b:any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
        console.log("Scheduled Appointments : ",this.scheduled_appointments);
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        alert('Failed to Fetch Appointments. Please try again later.');
      }
    });
}

}


