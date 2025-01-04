import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inactivedoctors',
  imports: [CommonModule],
  templateUrl: './inactivedoctors.component.html',
  styleUrl: './inactivedoctors.component.css'
})
export class InactivedoctorsComponent {
  constructor(private router: Router, private http: HttpClient,private sharedservice:SharedService) { }
  doctors: any[] = [];
  ngOnInit(): void {
    this.getDoctorsList();
  }

  getDoctorsList(): void {
    const apiUrl = "http://43.205.181.183:5000/api/Admin/DoctorsList";
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log("Patients List: ", response);
        this.doctors = response.filter(patient => patient.account_Status === "Inactive");
        
      },
      (error) => {
        console.log("Error: ", error.message);
        alert("Failed to get Patient Data");
      }
    );
  }

  // viewProfile(id: string): void {
  //   console.log("Inactive doctor id : ",id);
  //   this.sharedservice.setDoctorId(id);
  //  this.router.navigate(['/doctor/profileadmin']);
   
  // }

  
updateStatus(id: string): void {
    const apiUrl = `http://43.205.181.183:5000/api/Admin/UpdateAccountStatus?usertype=Doctor&Id=${id}`;
  
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
            this.getDoctorsList();
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
}