
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-registration',
   imports: [FormsModule, HttpClientModule, CommonModule,ReactiveFormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.css'
})
export class PatientRegistrationComponent {


  namePattern = '^[a-zA-Z\\s.]+$';
  numericPattern = '^[1-9][0-9]*$';
  mobilePattern = '^[0-9]{10}$';
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  registrationForm = new FormGroup({
    patientName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.namePattern)],
    }),
    age: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.numericPattern)],
    }),
    fatherName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.namePattern)],
    }),
    physicianName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.namePattern)],
    }),
    gender: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    height: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.numericPattern)],
    }),
    bloodType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.pattern(this.emailPattern),
    }),
    mobileNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.mobilePattern)],
    }),
    emergencyContact: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.mobilePattern)],
    }),
  });

  http = inject(HttpClient);
  constructor(private router:Router){}

  postRegistration(): void {
    const formValues = this.registrationForm.value;

    const addRegistrationRequest = {
      PatientName: this.registrationForm.value.patientName,
      Age: Number(this.registrationForm.value.age),
      FathersName:  this.registrationForm.value.fatherName,
      Physician:  this.registrationForm.value.physicianName,
      Gender:  this.registrationForm.value.gender,
      Height: Number( this.registrationForm.value.height),
      BloodType:  this.registrationForm.value.bloodType,
      Email:  this.registrationForm.value.email,
      MobileNumber:  this.registrationForm.value.mobileNumber,
      EmergencyContact:  this.registrationForm.value.emergencyContact,
    };
    
    this.http.post('https://localhost:7287/api/Home/PatientRegistration', addRegistrationRequest).subscribe({
      next: (response:any) => {
        console.log('Registration successful:', response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration has been successfully completed. Check your registered email for credentials.',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {this.router.navigate(['home/login'])});
      },
      error: (err) => {
        console.error('HTTP Error:', err);
        if (err.status === 409) {
          Swal.fire('This email is already registered.');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to register. Please try again later.',
          });
        }
      },
    });
  }

  
}
