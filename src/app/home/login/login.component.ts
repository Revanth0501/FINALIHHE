import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  namePattern = '^[a-zA-Z\\s.]+$';
  loginForm=new FormGroup({

    userRole:new FormControl('', {
      nonNullable:true,
      validators:[Validators.required]
    }),

    username:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),

    password:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    })
  })

  PasswordVisible: boolean = false;
  togglePasswordVisibility(): void {
    this.PasswordVisible = !this.PasswordVisible;
  }
  constructor(private http:HttpClient,private router:Router,private sharedservice:SharedService){}
  
  onSubmit():void
  {
    
    const userrole = this.loginForm.value.userRole;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const apiUrl=`https://localhost:7287/api/Home/UserAuthentication?usertype=${userrole}&username=${username}&password=${password}`
    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        console.log("Login Successful", response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          switch (userrole) {
            case "Patient":
              this.sharedservice.setPatientId(response.patientId);
              console.log("Patient Id in login:", this.sharedservice.getPatientId());
              this.router.navigate(['/patient/bookappointment']);
              break;
    
            case "Doctor":
              this.sharedservice.setDoctorId(response.doctorId);
              console.log("Doctor Id in login:", this.sharedservice.getDoctorId());
              this.router.navigate(['doctor/appointment']);
              break;
    
            case "Hospital":
              this.sharedservice.setHospitalId(response.hospitalId);
              console.log("Hospital Id in login:", this.sharedservice.getHospitalId());
              this.router.navigate(['hospital']);
              break;
    
            default:
              this.router.navigate(['admin']);
              break;
          }
        });
      },
      error: (err) => {
        console.error("Http Error: ", err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "User Doesn't exist or Invalid Credentials.",
        });
      }
    });
    
  }



}