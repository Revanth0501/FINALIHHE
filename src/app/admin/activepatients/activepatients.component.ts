import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-activepatients',
  imports: [CommonModule],
  templateUrl: './activepatients.component.html',
  styleUrl: './activepatients.component.css'
})
export class ActivepatientsComponent {
  constructor(private router: Router, private http: HttpClient,private sharedservice:SharedService) {
   }
  patients: any[] = [];

  ngOnInit(): void {
    this.getPatientsList();
  }

  getPatientsList(): void {
    const apiUrl = "https://localhost:7287/api/Admin/PatientsList";
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log("Patients List: ", response);
        this.patients = response.filter(patient => patient.account_Status === "Active");
        
      },
      (error) => {
        console.log("Error: ", error.message);
        alert("Failed to get Patient Data");
      }
    );
  }

  viewProfile(id: number): void {
   this.sharedservice.setPatientId(id);
   this.router.navigate(['/patient/profileadmin']);
  }

  updateDetails(id: number): void {
    this.sharedservice.setPatientId(id);
   this.router.navigate(['/patient/updateprofileadmin'])
  }

  viewPassword(id: number): void {
    const apiUrl = `https://localhost:7287/api/Admin/GetPassword?usertype=Patient&PatientId=${id}`;
  
    this.http.get(apiUrl, { responseType: 'text' }).subscribe(
      (response: string) => {
        if (response) {
          Swal.fire({
            title: 'Password Retrieved',
            text: `Password: ${response}`,
            icon: 'info',
          });
        } else {
          Swal.fire({
            title: 'No Password Found',
            text: 'No password is associated with the provided ID.',
            icon: 'warning',
          });
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to retrieve password. Please try again.',
          icon: 'error',
        });
      }
    );
  }
  

  deletePatient(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to deactivate this account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Deactivate it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `https://localhost:7287/api/Patient/DeletePatient?PatientId=${id}`;
        this.http.delete<any>(apiUrl).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'OK',
              timer:2000
            }).then(() => {
              window.location.reload();
            });
          },
          error: (err) => {
            console.error('Error deleting the account', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the account. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Cancelled',
          text: 'Account deletion was cancelled.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    });
  }
}
