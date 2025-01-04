import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inactivehospitals',
  imports: [CommonModule],
  templateUrl: './inactivehospitals.component.html',
  styleUrl: './inactivehospitals.component.css'
})
export class InactivehospitalsComponent {
 constructor(private router: Router, private http: HttpClient,private sharedservice:SharedService) { }
   hospitals: any[] = [];
   ngOnInit(): void {
     this.getHospitalsList();
   }
 
   getHospitalsList(): void {
     const apiUrl = "http://43.205.181.183:5000/api/Admin/HospitalList";
     this.http.get<any[]>(apiUrl).subscribe(
       (response) => {
         console.log("Hospitals List inactive: ", response);
         this.hospitals = response.filter(hospital => hospital.accountStatus === "Inactive");
         console.log("Inactive :",this.hospitals);
         
       },
       (error) => {
         console.log("Error: ", error.message);
         alert("Failed to get Hospital Data");
       }
     );
   }
 
   // viewProfile(id: string): void {
   //   console.log("Inactive doctor id : ",id);
   //   this.sharedservice.setDoctorId(id);
   //  this.router.navigate(['/doctor/profileadmin']);
    
   // }
 
   
 updateStatus(id: string): void {
     const apiUrl = `http://43.205.181.183:5000/api/Admin/UpdateAccountStatus?usertype=Hospital&Id=${id}`;
   
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
            this.getHospitalsList();
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

