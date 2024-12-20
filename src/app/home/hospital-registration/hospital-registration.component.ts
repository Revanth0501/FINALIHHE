import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-registration',
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './hospital-registration.component.html',
  styleUrl: './hospital-registration.component.css'
})
export class HospitalRegistrationComponent {
  hospital_Registration: FormGroup;

  http = inject(HttpClient);

  constructor(private fb: FormBuilder) {
    this.hospital_Registration = this.fb.group({
      Hospital_Name: ['', Validators.required],
      Hospital_User_Name: ['', Validators.required],
      Hospital_Email: [
        '', 
        [Validators.required, Validators.email], 
        [this.emailValidator()]
      ],
      Hospital_Phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Hospital_Address: ['', Validators.required],
      Hospital_Avilable_Facilities: ['', Validators.required],
      Hospital_Type: ['', Validators.required],
      Hospital_Code: ['', Validators.required],
      Hospital_Established_Date: ['', Validators.required],
    
      Hospital_Ownership_Type: ['', Validators.required],
      Hospital_Region: ['', Validators.required]
    });
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const email = control.value;
      if (!email) {
        return of(null); // No email entered, skip validation
      }
      return this.http
        .get<{ exists: boolean }>(`https://localhost:7195/api/Hospital_Contoller/Email?email=${email}`)
        .pipe(
          map((response) => (response.exists ? { emailExists: true } : null)),
          catchError(() => of(null))
        );
    };
  }

  checkEmailExistence(): Observable<boolean> {
    const email = this.hospital_Registration.get('Hospital_Email')?.value;
    return this.http.get<{ exists: boolean }>(`https://localhost:7195/api/Hospital_Contoller/Email?email=${email}`).pipe(
      map(response => response.exists)
    );
  }

  on_Submit() {
    if (this.hospital_Registration.valid) {
      this.checkEmailExistence().subscribe((emailExists) => {
        if (emailExists) {
          Swal.fire({
            icon: 'error',
            title: 'Email already exists',
            text: 'Please use a different email address.',
          });
        } else {
          const hospitalData = this.hospital_Registration.value;

          this.http.post('https://localhost:7195/api/Hospital_Contoller/PostHospitalData', hospitalData)
            .subscribe(
              (data: any) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registration Successful",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.hospital_Registration.reset();
              },
              (error: any) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Registration Unsuccessful. Please try again later!",
                });
              }
            );
        }
      });
    } else {
      Object.keys(this.hospital_Registration.controls).forEach(field => {
        const control = this.hospital_Registration.get(field);
        if (control && control.invalid) {
          console.log(`${field} is invalid. Errors:`, control.errors);
        }
      });
      alert('Please fill out the form correctly.');
    }
  }
}
