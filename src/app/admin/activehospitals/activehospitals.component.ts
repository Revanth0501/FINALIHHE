import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-activehospitals',
  imports: [CommonModule],
  templateUrl: './activehospitals.component.html',
  styleUrl: './activehospitals.component.css'
})
export class ActivehospitalsComponent {
  constructor(private router: Router, private http: HttpClient,private sharedservice:SharedService) { }
  hospitals: any[] = [];
  ngOnInit(): void {
    this.getHospitalsList();
  }

  getHospitalsList(): void {
    const apiUrl = "http://43.205.181.183:5000/api/Admin/HospitalList";
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log("Doctors List: ", response);
        this.hospitals = response.filter(doctor => doctor.accountStatus === "Active");
        
      },
      (error) => {
        console.log("Error: ", error.message);
        alert("Failed to get Patient Data");
      }
    );
  }

  viewProfile(id: string): void {
    
    this.sharedservice.setHospitalId(id);
    this.router.navigate(['/admin/hospitalprofile']);
  }

  // updateDetails(id:string): void {
  //   this.sharedservice.setHospitalId(id);
  //   this.router.navigate(['/hospital/updateprofileadmin']);
  // }

  // viewPassword(id:string): void {
  //      const apiUrl = `https://localhost:7287/api/Admin/GetPassword?usertype=Hospital&Id=${id}`;
        
  //         this.http.get(apiUrl, { responseType: 'text' }).subscribe(
  //           (response: string) => {
  //             if (response) {
  //               Swal.fire({
  //                 title: 'Password Retrieved',
  //                 text: `Password: ${response}`,
  //                 icon: 'info',
  //               });
  //             } else {
  //               Swal.fire({
  //                 title: 'No Password Found',
  //                 text: 'No password is associated with the provided ID.',
  //                 icon: 'warning',
  //               });
  //             }
  //           },
  //           (error) => {
  //             Swal.fire({
  //               title: 'Error',
  //               text: 'Failed to retrieve password. Please try again.',
  //               icon: 'error',
  //             });
  //           }
  //         );
  //   }
  
  deleteHospital(id: number): void {
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
        const apiUrl = `http://43.205.181.183:5000/api/Hospital/DeleteHospital?hospitalId=${id}`;
        this.http.delete<any>(apiUrl).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deactivated!',
              text: "Account Deactivated Successfully",
              icon: 'success',
              confirmButtonText: 'OK',
            }).then( () => {this.getHospitalsList()});
          },
          error: (err) => {
            console.error('Error deactivating the account', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to deactivating the account. Please try again later.',
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
