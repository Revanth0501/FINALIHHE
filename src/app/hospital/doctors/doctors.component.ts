import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  doctors: any[] = [];  
  hospitalId:string="";
  constructor(private http: HttpClient,private sharedservice:SharedService) {
    this.hospitalId=sharedservice.getHospitalId();
  }
  filteredDoctors: any[]=[];
  ngOnInit(): void {
    this.getDoctors(); 
    
  }
  getDoctors(): void {
    console.log("Sending API request");
    console.log("Hospital Id:",this.hospitalId);
    this.http.get<any>(`http://43.205.181.183:5000/api/Hospital/DoctorsList?HospitalId=${this.hospitalId}`).subscribe(
      (data:any) => { 
        console.log("Data Recieved for doctors")
        console.log(data); 
        this.filteredDoctors=data;
       
      //   this.filteredDoctors = data.filter(
      //     (doctor: { doctor_Hospital: string }) => doctor.doctor_Hospital === 'NIMS Hospital' 
      // );
        
      },
      (error) => {
        console.error('Error fetching doctors:', error);  
      }
    );
  }
}
