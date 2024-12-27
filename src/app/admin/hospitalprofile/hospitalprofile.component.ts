import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-hospitalprofile',
  imports: [],
  templateUrl: './hospitalprofile.component.html',
  styleUrl: './hospitalprofile.component.css'
})
export class HospitalprofileComponent {
hospital_data: any = null;
  hospital_id: string = 'C6D478FF-16A6-4081-6B2F-08DD20D3F015'; // Example hospital ID
  encodedImage?: string | null = null; // Holds the base64 encoded image data

  constructor(private http: HttpClient, private fb: FormBuilder,private sharedservice:SharedService) {
    this.hospital_id=sharedservice.getHospitalId();
  }

  ngOnInit(): void {
    this.getHospital_profile();
  }

  // Fetch hospital profile data from the backend API
  getHospital_profile(): void {
    const apiUrl = `https://localhost:7287/api/Hospital/HospitalProfile?HospitalId=${this.hospital_id}`;
    this.http.get<any>(apiUrl).subscribe(
      (data: any) => {
        this.hospital_data = data;
        console.log('Response Data:', data);

        
        if (data && data.hospital_Logo) {
          this.encodedImage = `data:image/png;base64,${data.Hospital_Logo}`;
        
        } else {
          console.error('Hospital logo data is missing or undefined.');
        }
      },
      (error) => {
        console.error('Error fetching hospital profile:', error);
      }
    );
  }

  
  private ensureBase64Prefix(base64Image?: string | null): string | undefined {
    if (!base64Image) return undefined;
    if (base64Image.startsWith('data:image')) return base64Image;
    return `data:image/jpeg;base64,${base64Image}`;
  }
}
