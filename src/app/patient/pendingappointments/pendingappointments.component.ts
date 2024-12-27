import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-pendingappointments',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './pendingappointments.component.html',
  styleUrl: './pendingappointments.component.css'
})
export class PendingappointmentsComponent {
  pending_appointments:any=[];
  appointments:any=[]
  patientId:number=0;
  constructor(private http: HttpClient,private sharedservice:SharedService) {
    this.patientId=sharedservice.getPatientId();
   }

  ngOnInit(): void {
    this.appointmentsFetch()
  }

  appointmentsFetch(): void {
    const apiUrl = `https://localhost:7287/api/Patient/AppointmentsFetch?PatientId=${this.patientId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.pending_appointments = response.filter(
          (appointment: { status: string }) =>
            appointment.status?.trim().toLowerCase() === 'pending'
        );
        this.pending_appointments.sort((a:any, b:any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())

        console.log("Pending Appointments : ",this.pending_appointments)
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        alert('Failed to Fetch Appointments. Please try again later.');
      }
    });
}

}
