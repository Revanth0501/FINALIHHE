import { ViewportScroller } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-page',
  imports: [HttpClientModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  isScrolled = false;
  route = inject(Router);
  contactForm: FormGroup;
  http = inject(HttpClient);
  constructor(private viewportScroller: ViewportScroller, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      UserName: ['', Validators.required],
      UserEmail: ['', Validators.required],
      Message: ['', Validators.required],
      Subject: ['', Validators.required]
    });
  }
  scrollTo(section: string): void {
    this.viewportScroller.scrollToAnchor(section);
  }
  ngOnInit(): void {

  }
  onSubmit(): void {
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill all the fields correctly before submitting.',
      });
      return;
    }
    const formData = this.contactForm.value;
    this.http.post('https://localhost:7195/api/Hospital_Contoller/RegistrationIssue', formData)
      .subscribe(
        (response: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Message Sent Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          this.contactForm.reset();
        },
        (error: any) => {
          console.error('Error submitting the form:', error);
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'An error occurred while sending your message. Please try again later.',
          });
        }
      );
  }
  Login(): void {

    this.route.navigate(['/home/login']);
  }
  HospitalRegistartion():void{
    this.route.navigate(['/home/hospital']);
  }
  DoctorRegistration():void{
    this.route.navigate(['home/doctors']);
  }
  PatientRegistration():void{
    this.route.navigate(['home/patients']);
  }
 
}


