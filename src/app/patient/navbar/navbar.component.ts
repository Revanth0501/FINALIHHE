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
      text: 'Do you really want to deactivate your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deactivate it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `http://43.205.181.183:5000/api/Patient/DeletePatient?PatientId=${this.patientId}`;
        this.http.delete<any>(apiUrl).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Deactivated!',
              text: 'Account Deactivated Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then( () =>  this.router.navigate(['home']));
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
          text: 'Account Deactivate cancelled.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    });
  }
}
