import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {isAppointmentDropdownOpen = false;
  isPatientDropdownOpen = false;
  isDoctorDropdownOpen = false;
  isHospitalsDropdownOpen = false;
  isTicketsDropdownOpen = false;
  isRegistrationsDropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown(state: boolean, droptype: string): void {
    switch(droptype) {
      case 'patients':
        this.isPatientDropdownOpen = state;
        break;
      case 'doctors':
        this.isDoctorDropdownOpen = state;
        break;
      case 'hospitals':
        this.isHospitalsDropdownOpen = state;
        break;
      case 'tickets':
        this.isTicketsDropdownOpen = state;
        break;
      case 'registrations':
        this.isRegistrationsDropdownOpen = state;
        break;
      default:
        this.isAppointmentDropdownOpen = state;
    }
  }

  closeDropdown(): void {
    this.isAppointmentDropdownOpen = false;
    this.isPatientDropdownOpen = false;
    this.isDoctorDropdownOpen = false;
    this.isHospitalsDropdownOpen = false;
    this.isTicketsDropdownOpen = false;
    this.isRegistrationsDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const dropdown = document.querySelector('.navbar-nav');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  // Navigation Methods
  getActivePatients(): void {
    this.router.navigate(['/admin/activepatients']);
  }

  getInActivePatients(): void {
    this.router.navigate(['/admin/inactivepatients']);
  }

  getActiveDoctors(): void {
    this.router.navigate(['/admin/activedoctors']);
  }

  getInActiveDoctors(): void {
    this.router.navigate(['/admin/inactivedoctors']);
  }

  getActiveHospitals(): void {
    this.router.navigate(['/admin/activehospitals']);
    this.closeDropdown();
  }

  getInActiveHospitals(): void {
    this.router.navigate(['/admin/inactivehospitals']);
    this.closeDropdown();
  }

  getPendingTickets(): void {
    this.router.navigate(['/admin/pendingtickets']);
    this.closeDropdown();
  }

  getSolvedTickets(): void {
    this.router.navigate(['/admin/solvedtickets']);
    this.closeDropdown();
  }

  registerPatient(): void {
    this.router.navigate(['/home/patients']);
    this.closeDropdown();
  }

  registerDoctor(): void {
    this.router.navigate(['/home/doctors']);
    this.closeDropdown();
  }

  registerHospital(): void {
    this.router.navigate(['/home/hospital']);
    this.closeDropdown();
  }

  getVisited(): void {
    this.router.navigate(['/admin/visitedappointments']);
    this.closeDropdown();
  }

  getNonVisited(): void {
    this.router.navigate(['/admin/nonvisitedappointments']);
    this.closeDropdown();
  }
}
