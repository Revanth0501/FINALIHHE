import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  http = inject(HttpClient);
  router = inject(Router);
  patientId:number=0;

  constructor(private sharedservice:SharedService){
    this.patientId=sharedservice.getPatientId();
  }

  isAppointmentDropdownOpen = false;
  isProfileDropdownOpen = false;

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
    const dropdown = document.querySelector('.navbar-nav');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  getScheduled(): void {
    this.closeDropdown();
    this.router.navigate(['/patient/scheduledappointments']);
  }

  getPending(): void {
    this.closeDropdown();
    this.router.navigate(['/patient/pendingappointments']);
  }

  getPast(): void {
    this.closeDropdown();
    this.router.navigate(['/patient/pastappointments']);
  }

  getRejected(): void {
    this.closeDropdown();
    this.router.navigate(['/patient/rejectedappointments']);
  }

  getProfile(): void {
    this.closeDropdown();
    this.router.navigate(['/patient/profile']);
  }

  updateProfile(): void {
    this.closeDropdown();
    this.router.navigate(['/patient/updateAccount']);
  }

  changePassword():void{
    this.closeDropdown();
    this.router.navigate(['patient/updatePassword']);
  }

  logOut():void
  {
    this.router.navigate(['/home/login'])
    
  }

  deleteAccount(): void {
    this.closeDropdown();
    console.log("Nav Bar Patient Id :",this.patientId);
    this.router.navigate(['profile']);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `https://localhost:7287/api/Patient/DeletePatient?PatientId=${this.patientId}`;
        this.http.delete<any>(apiUrl).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'OK',
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
