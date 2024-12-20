import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactus',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  Contactform: FormGroup;
  Doctor_Data: any[]=[];
  doctorId:string="";

  private http = inject(HttpClient);

  constructor(private fb: FormBuilder,private sharedservice:SharedService) {
    this.Contactform = this.fb.group({
      UserEmail: ['', Validators.required],
      Issue: ['', Validators.required],
      UserType: ['Doctor', Validators.required], 
      UserId: ['', Validators.required], 
    });
    this.doctorId=this.sharedservice.getDoctorId();
  }

  ngOnInit(): void {
    this.GetDoctorData();
  }

  onSubmit(): void {
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
            text: 'Your isuue has not been recorded. Please try again later.',
          });
        }
      );
    } else {
      Object.keys(this.Contactform.controls).forEach((field) => {
        const control = this.Contactform.get(field);
        if (control && control.invalid) {
          console.log(`${field} is invalid. Errors:, control.errors`); 
        }
      });
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly.',
      });
    }
  }

  GetDoctorData(): void {
    
    const api = `https://localhost:7287/api/Doctor/DoctorProfile?Doctor_Id=${this.doctorId}`;
  
    this.http.get(api).subscribe({
      next: (data: any) => {
        console.log('API Response:', data);  
        if (data && data.email && data.doctor_Id) {
          
          this.Contactform.patchValue({
            UserEmail: data.email, 
            UserId: data.doctor_Id,
          });
        } else {
          console.warn('Missing required fields in doctor data:', data);
        }
      },
      error: (err) => {
        console.error('Failed to fetch doctor data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error fetching data',
          text: 'Unable to fetch doctor data. Please try again later.',
        });
      },
    });
  }
  
}