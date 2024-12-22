import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nonvisitedappointments',
  imports: [CommonModule],
  templateUrl: './nonvisitedappointments.component.html',
  styleUrl: './nonvisitedappointments.component.css'
})
export class NonvisitedappointmentsComponent {

  constructor(private router:Router,private http:HttpClient){}
  appointments:any[]=[]
  ngOnInit()
  {
    this.getAppointments();
  }

  getAppointments():void
  {
    const apiUrl="https://localhost:7287/api/Admin/AppointmentsFetch"
    this.http.get<any []>(apiUrl).subscribe(
      (response) => 
      {
        this.appointments=response.filter(appointment => appointment.status != "Visited")
        .map(appointment => ({
          ...appointment, 
          appointmentId: appointment.appointmentId.toUpperCase()  
        }));
        console.log(this.appointments);
      },
      (error) =>
      {
        console.log(error);
        alert("Failed to Get Appointments");
      }
    )
  }


  updateAppointmentStatus(AppointmentId: string): void {
    Swal.fire({
      title: 'Select Appointment Status',
      html: `
        <select id="status-dropdown" class="swal2-input">
         <option value="Approved">Approve</option>  
          <option value="Rejected">Reject</option>
          <option value="Pending">Pending</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update Status',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const dropdown = document.getElementById('status-dropdown') as HTMLSelectElement;
        return dropdown ? dropdown.value : null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedStatus = result.value;
        const apiUrl = `https://localhost:7287/api/Admin/ApointmentStatusModification?AppointmentId=${AppointmentId}&Status=${selectedStatus}`;
        console.log("Sending Update Request with status:", selectedStatus);
        this.http.put(apiUrl, {}).subscribe(
          (response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Appointment status changed successfully",
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.log(error.message);
            alert("Failed to Modify status");
          }
        );
      }
    });
  }
}
