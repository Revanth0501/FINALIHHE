import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-navbar',
  imports: [HttpClientModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  route = inject(Router);
    http=inject(HttpClient);
    doctor_id:string="";
    isAppointmentDropdownOpen = false;
    isProfileDropdownOpen = false;

    constructor(private sharedservice:SharedService)
    {
      this.doctor_id=sharedservice.getDoctorId();
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
      this.route.navigate(['/doctor/profile']);
    }

    Update_Doctor_Profile(): void {
      this.closeDropdown();
      this.route.navigate(['/doctor/update-profile']);
    }
  
    Change_Password(): void {
      this.route.navigate(['/doctor/change-password']);
    }
    Appointmnets():void{
      this.route.navigate(['/doctor/appointment'])
    }
    onsubmit():void{
      this.route.navigate(["doctor_profile"]);
    }
    RaiseTicket():void{
      this.route.navigate(['/doctor/contactus'])
    }
     
    Delete_Account(): void {
      Swal.fire({
        title: "Do you want to deactivate your account?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          const api = `http://43.205.181.183:5000/api/Doctor/DeleteAccount?Id=${this.doctor_id}`;
  
          this.http.delete(api).subscribe(
            (response: any) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Account successfully deactivated",
                showConfirmButton: false,
                timer: 1500
              }).then( () => { this.route.navigate(['home']); });
             
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
      this.route.navigate(['/home/login']);
    }
  }