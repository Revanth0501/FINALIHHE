import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-pendingappointments',
  imports: [CommonModule],
  templateUrl: './pendingappointments.component.html',
  styleUrl: './pendingappointments.component.css'
})
export class PendingappointmentsComponent {
  hospitalId:string="";
  http = inject(HttpClient);
  constructor(private router: Router,private sharedservice:SharedService) {
    this.hospitalId=sharedservice.getHospitalId();
   }
  pendingAppointments: any[] = []



  ngOnInit(): void {
    this.getAppointments()
  }

  getAppointments() {
    const apiUrl = `https://localhost:7287/api/Hospital/Appointments?HospitalId=${this.hospitalId}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log(response);
        this.pendingAppointments = response.filter(appointment => appointment.status === "Pending");
        console.log(this.pendingAppointments);
      },
      (error) => {
        console.error(error.message);
      }
    )
  }


  Approve(id: string): void {
    Swal.fire({
      title: "Are you sure you want to approve this appointment?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {

      if (result.isConfirmed) {
        this.http.put(`https://localhost:7287/api/Hospital/AppointmentsApproval`, null, {
          params: {
            AppointmentId: id,
            status: 'Approved',
          },
        })
          .subscribe(
            (data: any) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Appointment approved successfully!",
                showConfirmButton: false,
                timer: 1500
              });
              this.getAppointments();
            },
            (error) => {
              console.error('Error approving appointment:', error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to approve the appointment. Please try again!",

              });

            }
          );
      }

      else if (result.isDenied) {
        Swal.fire({
          title: "Canceled ?",
          text: "You have not taken any decision?",
          icon: "question"
        });
      }
    });
  }
  Reject(id: string): void {
    Swal.fire({
      title: "Are you sure you want to reject this appointment?",
      showDenyButton: true,

      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {

      if (result.isConfirmed) {
        this.http
          .put(`https://localhost:7287/api/Hospital/AppointmentsApproval`, null, {
            params: {
              AppointmentId: id,
              status: 'Rejected',
            },
          })
          .subscribe(
            (data: any) => {

              Swal.fire("Appointment rejected successfully!");

              this.getAppointments();
            },
            (error) => {
              console.error('Error rejecting appointment:', error);
              Swal.fire("Failed to reject the appointment. Please try again!");

            }
          );

      }
    });
  }
}

