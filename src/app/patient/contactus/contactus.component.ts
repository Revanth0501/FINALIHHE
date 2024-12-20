import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../shared.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactus',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  Contactform: FormGroup;
  Doctor_Data: any[] = [];
  patientId: number = 0;

  private http = inject(HttpClient);

  constructor(private fb: FormBuilder, private sharedservice: SharedService) {
    this.patientId = this.sharedservice.getPatientId();
    this.Contactform = this.fb.group({
      UserEmail: ['', Validators.required],
      Issue: ['', Validators.required],
      UserType: ['Patient', Validators.required],
      UserId: [this.patientId, Validators.required], // Ensure patientId is initially set correctly
    });
  }

  ngOnInit(): void {
    this.GetPatientData();
  }

  onSubmit(): void {
    console.log(this.Contactform.value);
    if (this.Contactform.valid) {
      const Contactformdata = this.Contactform.value; 

      this.http.post('https://localhost:7287/api/Admin/RaiseTicket', Contactformdata).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your issue has been recorded',
            showConfirmButton: false,
            timer: 1500,
          });
          this.Contactform.reset(); 
        },
        (error: any) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'Your issue has not been recorded. Please try again later.',
          });
        }
      );
    } else {
      Object.keys(this.Contactform.controls).forEach((field) => {
        const control = this.Contactform.get(field);
        if (control && control.invalid) {
          console.log(`${field} is invalid. Errors:`, control.errors); 
        }
      });
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly.',
      });
    }
  }

  GetPatientData(): void {
    const api = `https://localhost:7287/api/Patient/PersonalInformation?PatientId=${this.patientId}`;
  
    this.http.get(api).subscribe({
      next: (data: any) => {
        console.log('API Response:', data);  
        if (data && data[0].email && data[0].patientId) {
          this.Contactform.patchValue({
            UserEmail: data[0].email, 
            UserId: data[0].patientId.toString(), 
          });
        } else {
          console.warn('Missing required fields in patient data:', data);
        }
      },
      error: (err) => {
        console.error('Failed to fetch patient data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error fetching data',
          text: 'Unable to fetch patient data. Please try again later.',
        });
      },
    });
  }
}
