import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-rejectedappointments',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './rejectedappointments.component.html',
  styleUrl: './rejectedappointments.component.css'
})
export class RejectedappointmentsComponent {
  rejected_appointments:any=[];
  patientId:number=0;
  constructor(private http: HttpClient,private sharedservice:SharedService) {
    this.patientId=sharedservice.getPatientId();
   }

  ngOnInit(): void {
    this.appointmentsFetch()
  }

  appointmentsFetch(): void {

    const apiUrl = `http://43.205.181.183:5000/api/Patient/AppointmentsFetch?PatientId=${this.patientId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.rejected_appointments = response.filter(
          (appointment: { status: string }) =>
            appointment.status?.trim().toLowerCase() === 'rejected'
        );
        this.rejected_appointments.sort((a:any, b:any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())
        console.log("Rejected Appointments : ",this.rejected_appointments);
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        alert('Failed to Fetch Appointments. Please try again later.');
      }
    });
}
}
