import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-updateprofile',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})

export class UpdateprofileComponent implements OnInit {
  doctorForm: FormGroup;
  router=inject(Router);
  doctor_id: string = '';
  private http = inject(HttpClient);
  fetched_data: any = {};  
  hospitals: any[] = [];  

  constructor(private fb: FormBuilder,private sharedservice:SharedService) {
    this.doctor_id=this.sharedservice.getDoctorId();
    

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      associatedHospital: ['', Validators.required],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')]
      ],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.doctorProfile();
    this.getHosiptals();
  }

  
  onSubmit(): void {
    Swal.fire({
      title: "Do you want to update your profile?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.doctorForm.valid) {
          const doctorData = this.doctorForm.value;
          const url = `https://localhost:7287/api/Doctor/UpdationDoctorData?Doctor_Id=${this.doctor_id}`;

          
          this.http.put(url, doctorData).subscribe(
            (data: any) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Profile Updated Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              this.doctorForm.reset();
              this.router.navigate(['/doctor/profile']);
            },
            (error: any) => {
              console.error('Error:', error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Profile update unsuccessful. Please try again later!"
              });
            }
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill out the form correctly!"
          });
        }
      } else if (result.isDenied) {
        Swal.fire("You did not update your profile!");
      }
    });
  }

  
  getHosiptals(): void {
    const apiUrl = 'https://localhost:7287/api/Patient/HospitalsList';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log('Fetched hospital data:', data);
        this.hospitals = data;
      },
      (error: any) => {
        console.error('Error fetching hospital data:', error);
        alert("Error in fetching hospital data.");
      }
    );
  }

  
  doctorProfile(): void {
    const api = `https://localhost:7287/api/Doctor/DoctorProfile?Doctor_Id=${this.doctor_id}`;
    this.http.get<any[]>(api).subscribe(
      (data) => {
        console.log('Fetched data:', data);
        this.fetched_data = Array.isArray(data) ? data : [data]; 
        console.log('Assigned paricular_data:', this.fetched_data);
        if (this.fetched_data.length > 0) {
          
          this.doctorForm.patchValue({
            name: this.fetched_data[0].name,
            fieldOfStudy: this.fetched_data[0].fieldOfStudy,
            associatedHospital: this.fetched_data[0].associatedHospital,
            mobile: this.fetched_data[0].mobile,
            email: this.fetched_data[0].email
          });
        } else {
          console.error('No doctor data found');
        }
      },
      (error) => {
        console.error('Error fetching doctor data:', error);
      }
    );
  }
     
}
