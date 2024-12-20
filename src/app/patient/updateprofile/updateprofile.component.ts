import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-updateprofile',
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  personal_data: any = {};
  patientId:number=0;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef,private router: Router,private sharedservice:SharedService) {
    this.patientId=sharedservice.getPatientId();
   }

  ngOnInit(): void {
    this.getPersonalInformation();
  }

  // Fetching personal information from the API
  getPersonalInformation(): void {
    console.log(" Update Profile : ",this.patientId);
    const apiUrl = `https://localhost:7287/api/Patient/PersonalInformation?PatientId=${this.patientId}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        // Assuming response[0] contains the personal data object
        this.personal_data = response[0];
        console.log('Personal Information:', this.personal_data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching personal information:', err);
        alert('Failed to load personal information. Please try again later.');
        
      }
    });
  }

  onSubmit() {
    const apiUrl = "https://localhost:7287/api/Patient/UpdateProfile";
    
    this.http.put<any>(apiUrl, this.personal_data).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          title: "Do you want to update the changes?",
          showCancelButton: true,
          confirmButtonText: "Save"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success").then(() => {
              this.router.navigate(['/profile']);
            });
          }
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to Update Details. Please Try Again Later"
        });
      }
    });
  }
  
  
}