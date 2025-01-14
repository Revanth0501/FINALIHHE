import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-medicaldata',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './medicaldata.component.html',
  styleUrl: './medicaldata.component.css'
})
export class MedicaldataComponent {
  appointmentDetails: any[] = [];  
  patientId :number =0;

  constructor(private http: HttpClient,private sharedservice:SharedService) {}

  ngOnInit(): void {
    this.patientId=this.sharedservice.getPatientId();

    this.getAppointmentDetails();
  }


  getAppointmentDetails(): void {
    const apiUrl = `http://43.205.181.183:5000/api/Patient/AppointmentsData?patientId=${this.patientId}`;  
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.appointmentDetails = response;
        this.appointmentDetails.sort((a:any, b:any) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
        console.log('Sorted Appointment Details:', this.appointmentDetails);
      },
      error: (err) => {
        console.error('Error fetching appointment details', err);
        alert('Failed to load appointment details. Please try again later.');
      }
    });
  }
  
}

