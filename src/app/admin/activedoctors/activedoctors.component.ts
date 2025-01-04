import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activedoctors',
  imports: [CommonModule],
  templateUrl: './activedoctors.component.html',
  styleUrl: './activedoctors.component.css'
})
export class ActivedoctorsComponent {
  constructor(private router: Router, private http: HttpClient,private sharedservice:SharedService) { }
  doctors: any[] = [];
  ngOnInit(): void {
    this.getDoctorsList();
  }

  getDoctorsList(): void {
    const apiUrl = "http://43.205.181.183:5000/api/Admin/DoctorsList";
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log("Doctors List: ", response);
        this.doctors = response.filter(patient => patient.account_Status === "Active");
        
      },
      (error) => {
        console.log("Error: ", error.message);
        alert("Failed to get Patient Data");
      }
    );
  }

  viewProfile(id: string): void {
    this.sharedservice.setDoctorId(id);
   this.router.navigate(['/admin/doctorprofile']);
  }

  // updateDetails(id: string): void {
  //   this.sharedservice.setDoctorId(id);
  //  this.router.navigate(['/doctor/updateprofileadmin']);
  // }

  // viewPassword(id:string): void {
  //    const apiUrl = `https://localhost:7287/api/Admin/GetPassword?usertype=Doctor&Id=${id}`;
      
  //       this.http.get(apiUrl, { responseType: 'text' }).subscribe(
  //         (response: string) => {
  //           if (response) {
  //             Swal.fire({
  //               title: 'Password Retrieved',
  //               text: `Password: ${response}`,
  //               icon: 'info',
  //             });
  //           } else {
  //             Swal.fire({
  //               title: 'No Password Found',
  //               text: 'No password is associated with the provided ID.',
  //               icon: 'warning',
  //             });
  //           }
  //         },
  //         (error) => {
  //           Swal.fire({
  //             title: 'Error',
  //             text: 'Failed to retrieve password. Please try again.',
  //             icon: 'error',
  //           });
  //         }
  //       );
  // }

  deleteDoctor(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to deactivate your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deactivate it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `http://43.205.181.183:5000/api/Doctor/DeleteAccount?Id=${id}`;
        this.http.delete<any>(apiUrl).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deactivated!',
              text: "Account Deactivated Successfully",
              icon: 'success',
              confirmButtonText: 'OK',
            }).then( () => {this.getDoctorsList()});
            
          },
          error: (err) => {
            console.error('Error deactivating the account', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to deactivate the account. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Cancelled',
          text: 'Account deactivation was cancelled.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    });
  }

}

