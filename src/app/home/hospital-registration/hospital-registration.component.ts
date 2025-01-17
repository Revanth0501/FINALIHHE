import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-registration',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.css']
})
export class HospitalRegistrationComponent implements OnInit {
  hospital_Registration: FormGroup;
  today: string ='';

  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router) {
    this.hospital_Registration = this.fb.group({
      hospitalName: ['', Validators.required],
      founderName: ['', Validators.required],
      hospitalEmail: ['', [Validators.required, Validators.email]],
      hospitalPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
      availableFacilities: ['', Validators.required],
      hospitalType: ['', Validators.required],
      hospitalAddress: ['', Validators.required],
      hospitalRegion: ['', Validators.required],
      hospitalEstablishedDate: ['', Validators.required],
      hospitalOwnershipType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.hospital_Registration = this.fb.group({
      hospitalEstablishedDate: ['', Validators.required]
    });
  }
  

  

  on_Submit() {
    if (this.hospital_Registration.valid) {
      const hospitalData = {
        hospitalName: this.hospital_Registration.value.hospitalName,
        founderName: this.hospital_Registration.value.founderName,
        hospitalEmail: this.hospital_Registration.value.hospitalEmail,
        hospitalPhoneNumber: this.hospital_Registration.value.hospitalPhoneNumber,
        availableFacilities: this.hospital_Registration.value.availableFacilities,
        hospitalType: this.hospital_Registration.value.hospitalType,
        hospitalAddress: this.hospital_Registration.value.hospitalAddress,
        hospitalRegion: this.hospital_Registration.value.hospitalRegion,
        hospitalEstablishedDate: this.hospital_Registration.value.hospitalEstablishedDate,
        hospitalOwnershipType: this.hospital_Registration.value.hospitalOwnershipType
      };

      this.http.post('https://localhost:7287/api/Home/HospitalRegistration', hospitalData)
        .subscribe(
          response => {
            console.log('Hospital registered successfully:', response);
            Swal.fire({
              title: 'Success!',
              text: 'Hospital registered successfully.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500, 
            }).then( () => {this.router.navigate(['/home/login'])});
          },
          error => {
            console.error('Error during registration:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Registration failed. Please try again later.',
              icon: 'error',
              confirmButtonText: 'Retry'
            });
          }
        );
    
    }
  }
}
