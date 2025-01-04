import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-registration',
  imports: [HttpClientModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './doctor-registration.component.html',
  styleUrl: './doctor-registration.component.css'
})
export class DoctorRegistrationComponent {
    doctorForm: FormGroup;
    doctors: any[] = [];
    namePattern = '^[a-zA-Z\\s.]+$';
    emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
    mobilePattern = '^[0-9]{10}$';
    
    private http = inject(HttpClient);

    constructor(private fb: FormBuilder,private router:Router) {
  
      this.doctorForm = this.fb.group(
        {
          name: ['', 
            [Validators.required,Validators.pattern(this.namePattern)]],
          fieldOfStudy: ['', Validators.required],
          associatedHospital: ['', Validators.required],
          mobile: [
            '',
            [Validators.required, Validators.pattern(this.mobilePattern)],
          ],
          email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        }
      );
    }

    ngOnInit(): void {
      this.get_doctor_data();
    }

    get_doctor_data(): void {
      const apiUrl = 'http://43.205.181.183:5000/api/Patient/HospitalsList';
      this.http.get<any>(apiUrl).subscribe(
        (data: any) => {
          this.doctors = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching doctors:', error);
        }
      );
    }

    onSubmit(): void {
     
        const doctorData = this.doctorForm.value;
        console.log(doctorData);
        this.http.post('http://43.205.181.183:5000/api/Home/DoctorRegistration', doctorData).subscribe(
          (data: any) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500
            }).then( () => this.router.navigate(['home/login']));
            
            this.doctorForm.reset();
          },
          (error: any) => {
            console.error('HTTP Error:', error.Message);
                    if (error.status === 409) {
                      Swal.fire('This email is already registered.');
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to register. Please try again later.',
                      });
                    }
            
          }
        );
      } 

      redirectToSignIn()
      {
        this.router.navigate(['/home/login'])
      }
}
  
  
  
  