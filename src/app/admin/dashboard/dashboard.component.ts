import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    hospitalCount=0;
    patientCount=0;
    doctorCount=0;
    appointmentCount=0;
    http=inject(HttpClient);

    ngOnInit()
    {
      this.countDoctors();
      this.countPatients();
      this.countHospitals();
      this.countAppointments();
    }

    countDoctors():void
    {
      const apiUrl="https://localhost:7287/api/Admin/DoctorsList";
      this.http.get<any[]>(apiUrl).subscribe(
        (response) => {
          this.doctorCount=response.length;
          console.log("Doctors Length : ",this.doctorCount);
        }
      )
    }

    countPatients():void
    {
      const apiUrl="https://localhost:7287/api/Admin/PatientsList";
      this.http.get<any[]>(apiUrl).subscribe(
        (response) => {
          this.patientCount=response.length;
          console.log("Patients Length : ",this.patientCount);
        }
      )
    }

    countHospitals():void
    {
      const apiUrl = "https://localhost:7287/api/Admin/HospitalList";
      this.http.get<any[]>(apiUrl).subscribe(
        (response) => {
          this.hospitalCount=response.length;
          console.log("Hospitals Length : ",this.hospitalCount);
        }
      )
    }

    countAppointments():void
    {
      const apiUrl="https://localhost:7287/api/Admin/AppointmentsFetch";
      this.http.get<any[]>(apiUrl).subscribe(
        (response) => {
          this.appointmentCount=response.length;
          console.log("Appointment Length : ",this.appointmentCount);
        }
      )
    }

    
}
