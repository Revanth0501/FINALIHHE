import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  imports: [HttpClientModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
  http = inject(HttpClient);
  passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+={}\\[\\]:;,.<>?/])[A-Za-z\\d!@#$%^&*()_+={}\\[\\]:;,.<>?/]{8,}$";
  patientId:number=0;

  newPasswordVisible: boolean = false;
  reenterPasswordVisible: boolean = false;

  oldPasswordVisible: boolean = false;
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
    oldPassword: new FormControl('', [Validators.required]),
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

  constructor(private fb: FormBuilder,private sharedservice:SharedService) {}

  onSubmit(): void {
    const oldPassword = this.updatePasswordForm.value.oldPassword;
    const newPassword = this.updatePasswordForm.value.newPassword;
    const reenterPassword = this.updatePasswordForm.value.reenterPassword;
  
    if (newPassword !== reenterPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please re-enter the new password correctly."
      });
      return;
    }

    this.patientId=this.sharedservice.getPatientId();
    const apiUrl = `http://43.205.181.183:5000/api/Patient/UpdatePassword?PatientId=${this.patientId}&currentPassword=${oldPassword}&newPassword=${newPassword}`;
    console.log(apiUrl);
    this.http.put<any>(apiUrl, {}).subscribe({
      next: (response) => {
        console.log("Password Changed Successfully");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password Changed Successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {this.updatePasswordForm.reset()});
      },
      error: (err) => {
        if (err.status === 404 && err.error.includes("Incorrect Password")) {
          Swal.fire({
            icon: "error",
            title: "Old password incorrect",
            text: "The old password you entered is incorrect. Please try again."
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to change password. Please try again later."
          });
        }
        console.log("Error:", err.message);
      }
    });
  }
  
}
