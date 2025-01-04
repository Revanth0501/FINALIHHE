import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patientmedicaldata',
  imports: [CommonModule],
  templateUrl: './patientmedicaldata.component.html',
  styleUrl: './patientmedicaldata.component.css'
})
export class PatientmedicaldataComponent {
  http=inject(HttpClient);
  appointmentDetails: any[] = [];
  patientIdParam :any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder){}
  ngOnInit(): void {
    this.getAppointmentDetails(); 
  }
  getAppointmentDetails(): void {
    this.patientIdParam = this.route.snapshot.paramMap.get('id');
    console.log('Received patient_id from route:',this.patientIdParam); 
    const apiUrl = `http://43.205.181.183:5000/api/Patient/AppointmentsData?patientId=${this.patientIdParam}`;
    console.log('API URL:', apiUrl); 

    
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        console.log('Appointment Details:', response); 
        this.appointmentDetails = response; 
      },
      error: (err) => {
        console.error('Error fetching appointment details:', err);
        Swal.fire({
          icon: "error",
          title: "Failed to load appointment details. Please try again later.",
          text: "Something went wrong!",
        }); 
      }
    });
  }

}
