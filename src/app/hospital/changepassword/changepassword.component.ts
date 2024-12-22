import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
  http = inject(HttpClient);
  route=inject(Router);
  passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&()_+={}\\[\\]:;,.<>?/])[A-Za-z\\d!@#$%^&()_+={}\\[\\]:;,.<>?/]{8,}$";
  hospitalId:String="";

  newPasswordVisible = false;
  reenterPasswordVisible = false;
  oldPasswordVisible = false;

  toggleOldPasswordVisibility(): void {
    this.oldPasswordVisible = !this.oldPasswordVisible;
  }

  toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleReenterPasswordVisibility(): void {
    this.reenterPasswordVisible = !this.reenterPasswordVisible;
  }

  updatePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.passwordPattern),
    ]),
    reenterPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.passwordPattern),
    ]),
  });

  constructor(private fb: FormBuilder,private serviceshared:SharedService) {
      this.hospitalId=this.serviceshared.getHospitalId();
  }

  onSubmit(): void {
    if (this.updatePasswordForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please ensure all fields are valid before submitting.',
      });
      return;
    }

    const oldPassword = this.updatePasswordForm.value.oldPassword;
    const newPassword = this.updatePasswordForm.value.newPassword;
    const reenterPassword = this.updatePasswordForm.value.reenterPassword;

    if (newPassword !== reenterPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please re-enter the new password correctly.',
      });
      return;
    }

    const apiUrl=`https://localhost:7287/api/Hospital/UpdatePassword?HospitalId=${this.hospitalId}&currentPassword=${oldPassword}&newPassword=${newPassword}`
    this.http.put<any>(apiUrl, {}).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Password Changed Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then( () => {
          this.updatePasswordForm.reset();
        this.route.navigate(['hospital-home']);
        });
        
      },
      error: (err) => {
        if (err.status === 404 && err.error.includes('Incorrect Password')) {
          Swal.fire({
            icon: 'error',
            title: 'Old password incorrect',
            text: 'The old password you entered is incorrect. Please try again.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to change password. Please try again later.',
          });
        }
        console.error('Error:', err.message);
      },
    });
  }
}

