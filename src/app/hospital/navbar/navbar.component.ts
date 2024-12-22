import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  route = inject(Router);
  http=inject(HttpClient);
  hospital_id:string="";
  isAppointmentDropdownOpen = false;
  isProfileDropdownOpen = false;

  constructor(private sharedservice:SharedService,private router:Router)
  {
    this.hospital_id=sharedservice.getHospitalId();
    console.log(this.hospital_id);
  }
  
  toggleDropdown(state: boolean, dropdownType: 'appointment' | 'profile'): void {
    if (dropdownType === 'appointment') {
      this.isAppointmentDropdownOpen = state;
    } else if (dropdownType === 'profile') {
      this.isProfileDropdownOpen = state;
    }
  }

  
  closeDropdown(): void {
    this.isAppointmentDropdownOpen = false;
    this.isProfileDropdownOpen = false;
  }

  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const dropdown = document.getElementById('navbarNav');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isAppointmentDropdownOpen = false;
      this.isProfileDropdownOpen = false;
    }
  }

  
  profile(): void {
    this.closeDropdown();
    this.route.navigate(['/hospital/profile']);
  }

  Pending_Appointment(): void {
    this.closeDropdown();
    this.route.navigate(['/hospital/pendingappointments']);
  }

  Schedule_Appointment(): void {
    this.closeDropdown();
    this.route.navigate(['/hospital/scheduledappointments']);
  }
  Hospital_Doctors():void{
    this.route.navigate(['/hospital/doctors']);
  }
  Hospital_Contact():void{
    this.route.navigate(['/hospital/contact']);
  }
  Rejected_Appointment(): void {
    this.closeDropdown();
    this.route.navigate(['/hospital/rejectedappointments']);
  }

  Update_Hospital_Profile(): void {
    this.closeDropdown();
    this.route.navigate(['hospital/updateprofile']);
  }

  Change_Password(): void {
    this.route.navigate(['hospital/changepassword']);
  }

  
   
  Delete_Account(): void {
    this.closeDropdown();
    this.route.navigate(['hospital_home']);
    Swal.fire({
      title: "Do you want to deactivate your account?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        const api = `https://localhost:7287/api/Hospital/DeleteHospital?hospitalId=${this.hospital_id}`;

        this.http.delete(api).subscribe(
          (response: any) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account successfully deactivated",
              showConfirmButton: false,
              timer: 1500
            }).then( () => { this.route.navigate(['home/login']);});
            
          },
          (error: any) => {
            console.error('Error:', error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.error?.Message || "An error occurred. Please try again later."
            });
          }
        );
      }
    });
  }

  
  Logout(): void {
    this.router.navigate(['/home/login']);
  }
}
