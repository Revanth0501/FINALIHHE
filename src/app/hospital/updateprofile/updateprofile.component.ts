import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateprofile',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  hospital_id: string = '';
  Update_Hospital_Profile: FormGroup;
  filter_data: any = {};  
  http = inject(HttpClient);
  route = inject(Router);

  constructor(private fb: FormBuilder,private sharedservice:SharedService) {

    this.hospital_id=sharedservice.getHospitalId();
    this.Update_Hospital_Profile = this.fb.group({
      hospitalId:['',Validators.required],
      hospitalName: ['', Validators.required],
      hospitalEmail: ['', [Validators.required, Validators.email]],
      hospitalPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      hospitalAddress: ['', Validators.required],
      avilableFacilities: ['', Validators.required],
      hospitalType: ['', Validators.required],
      hospitalOwnershipType: ['', Validators.required]
    });
  }

  
  on_Submit() {
    Swal.fire({
      title: "Do you want to update your profile?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.Update_Hospital_Profile.valid) {
          const hospitalData = this.Update_Hospital_Profile.value;
          console.log("Sending data : ",hospitalData);
          const api = `https://localhost:7287/api/Hospital/UpdateProfile`;
  
          this.http.put(api, hospitalData).subscribe(
            (data: any) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Profile Updation Success",
                showConfirmButton: false,
                timer: 1500
              });
              this.route.navigate(['hospital/profile']);
              this.Update_Hospital_Profile.reset();
            },
            (error: any) => {
              console.error('Validation Errors:', error.error.errors);
             
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unable to update.Please Try Again Later"
              });
            }
          );
        } else {
          Object.keys(this.Update_Hospital_Profile.controls).forEach(field => {
            const control = this.Update_Hospital_Profile.get(field);
            if (control && control.invalid) {
              console.log(`${field} is invalid. Errors:`, control.errors);
            }
          });
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill out the form correctly."
          });
        }
      }
    });
  }
  ngOnInit(): void {
    this.getHospital_profile();
  }

  getHospital_profile(): void {
    const apiUrl = `https://localhost:7287/api/Hospital/HospitalProfile?HospitalId=${this.hospital_id}`;

    this.http.get<any>(apiUrl).subscribe(
      (data: any) => {
        this.filter_data = data[0];
        console.log(this.filter_data);

        this.Update_Hospital_Profile.patchValue({
          hospitalId:this.filter_data.hospitalId,
          hospitalName: this.filter_data.hospitalName,
          hospitalEmail: this.filter_data.hospitalEmail,
          hospitalPhoneNumber: this.filter_data.hospitalPhoneNumber,
          hospitalAddress: this.filter_data.hospitalAddress,
          avilableFacilities: this.filter_data.availableFacilities,
          hospitalType: this.filter_data.hospitalType,
          hospitalOwnershipType: this.filter_data.hospitalOwnershipType
        });

        console.log(this.Update_Hospital_Profile.value);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
