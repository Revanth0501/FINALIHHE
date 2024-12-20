import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-bookappointment',
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {
  hospitals: any[] = [];
  doctors: any[] = [];
  currentDate: string;
  maxDate: string;
  patientId: number = 0;

  // Initialize the form group
  appointmentform = new FormGroup({
    patientid: new FormControl(this.patientId, { nonNullable: true }),
    hospital_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    doctor: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    timeslot: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    note: new FormControl('General', { nonNullable: true })
  });

  constructor(private router: Router, private http: HttpClient, private sharedservice: SharedService) {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    this.currentDate = today.toISOString().split('T')[0];
    this.maxDate = maxDate.toISOString().split('T')[0];
  }

  ngOnInit() {
   
    this.patientId = this.sharedservice.getPatientId();
    this.appointmentform.get('patientid')?.setValue(this.patientId);
    this.http.get<any[]>('https://localhost:7287/api/Patient/HospitalsList').subscribe({
      next: (data) => {
        console.log('Hospitals data: ', data);
        this.hospitals = data;
      },
      error: (err) => {
        console.error('Error fetching hospitals:', err);
      }
    });
  }

  onHospitalChange(hospital: string) {
    if (!hospital) return;

    this.http.get<any[]>(`https://localhost:7287/api/Patient/DoctorsList?HospitalName=${hospital}`).subscribe({
      next: (data) => {
        console.log('Doctors data: ', data);
        this.doctors = data.map(doctor => ({
          name: `${doctor.name} - ${doctor.fieldOfStudy}`,
          id: doctor.id
        }));
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
      }
    });
  }

  // Format date to ISO string format
  formatDate(date: string | null | undefined): string {
    if (!date) {
      console.error('Invalid date:', date);
      return '';
    }
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      console.error('Invalid date:', formattedDate);
      return '';
    }
    return formattedDate.toISOString().split('T')[0];
  }

  // Handle form submission
  onFormSubmit() {
    if (this.appointmentform.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }
    const addAppointmentRequest = {
      PatientId: Number(this.appointmentform.value.patientid),
      HospitalName: this.appointmentform.value.hospital_name,
      Doctor: this.appointmentform.value.doctor,
      AppointmentDate: this.formatDate(this.appointmentform.value.date),
      AppointmentTime: this.appointmentform.value.timeslot,
      AppointmentNote: this.appointmentform.value.note
    };

    console.log('Submitting Appointment Request:', addAppointmentRequest);

    // Send the appointment request to the API
    this.http.post("https://localhost:7287/api/Patient/BookAppoinment", addAppointmentRequest).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Appointment Request Initiated Successfully. Check status in Appointments.",
          showConfirmButton: false,
          timer: 2000
        }).then(() => { this.appointmentform.reset(); });
      },
      error: (err) => {
        console.error('HTTP Error:', err);
        if (err.status === 409) {
          Swal.fire('You already have an appointment at this date and time. Try with another date and time.');
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to book an appointment. Please try again later."
          });
        }
      }
    });
  }
}
