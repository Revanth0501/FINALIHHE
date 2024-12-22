import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-inactivepatients',
  imports: [CommonModule],
  templateUrl: './inactivepatients.component.html',
  styleUrl: './inactivepatients.component.css'
})
export class InactivepatientsComponent {

  constructor(private router: Router, private http: HttpClient,private sharedservice:SharedService) { }
  patients: any[] = [];

  ngOnInit(): void {
    this.getPatientsList();
  }

  getPatientsList(): void {
    const apiUrl = "https://localhost:7287/api/Admin/PatientsList";
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log("Patients List: ", response);
        this.patients = response.filter(patient => patient.account_Status === "Inactive");

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



  updateStatus(id: number): void {
    const apiUrl = `https://localhost:7287/api/Admin/UpdateAccountStatus?usertype=Patient&PatientId=${id}`;
  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the account status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(apiUrl, {}).subscribe(
          (next) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account Status Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          },
          (error) => {
            console.error("Error: ", error.message);
            Swal.fire({
              title: "Failed to Update",
              text: "An error occurred. Please try again later.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        );
      }
    });
  }
  

//    deletePatient(id: number): void {
//         this.router.navigate(['profile']);
//         Swal.fire({
//           title: 'Are you sure?',
//           text: 'Do you really want to delete your account?',
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#d33',
//           cancelButtonColor: '#3085d6',
//           confirmButtonText: 'Yes, delete it!',
//           cancelButtonText: 'No, cancel!',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             const apiUrl = `https://localhost:7287/api/Admin/DeletePatientPermanently?PatientId=${id}`;
//             this.http.delete<any>(apiUrl).subscribe({
//               next: (response) => {
//                 Swal.fire({
//                   title: 'Deleted!',
//                   text: response.message,
//                   icon: 'success',
//                   confirmButtonText: 'OK',
//                   timer:2000
//                 });
//                 window.location.reload();
//               },
//               error: (err) => {
//                 console.error('Error deleting the account', err);
//                 Swal.fire({
//                   title: 'Error!',
//                   text: 'Failed to delete the account. Please try again later.',
//                   icon: 'error',
//                   confirmButtonText: 'OK',
//                 });
//               }
//             });
//           } else {
//             Swal.fire({
//               title: 'Cancelled',
//               text: 'Account deletion was cancelled.',
//               icon: 'info',
//               confirmButtonText: 'OK',
//             });
//           }
//           window.location.reload();
//         });
//       }
}
