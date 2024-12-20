import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  http = inject(HttpClient);
  paricular_data: any[] = []; 
  doctor_id: string = "";

  constructor(private sharedservice:SharedService){
    this.doctor_id=sharedservice.getDoctorId();
  }

  ngOnInit(): void {
    this.Get_Doctor_Data();
  }

  Get_Doctor_Data(): void {
    const api = `https://localhost:7287/api/Doctor/DoctorProfile?Doctor_Id=${this.doctor_id}`;
    this.http.get<any[]>(api).subscribe(
      (data) => {
        console.log('Fetched data:', data);
        this.paricular_data = Array.isArray(data) ? data : [data]; 
        console.log('Assigned paricular_data:', this.paricular_data);
      },
      (error) => {
        console.error('Error fetching doctor data:', error);
        
      }
    );
  }

  
}