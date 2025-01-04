import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink,RouterOutlet,AgCharts,HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  patientId:number=0;
  medical_data: any[] = []; 
  latest_medical_data: any = null;
  personal_data: any = null;

  chartOptions: AgChartOptions = {
    data: [],
    series: [
      {
          type: 'donut',
      } as any,
  ],
  };
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef,private sharedservice:SharedService) {
    this.patientId=sharedservice.getPatientId();
  }

  ngOnInit(): void {
    this.getRecentMedicalData();
    this.getPersonalInformation();
  }

 
  getRecentMedicalData(): void {
    const apiUrl = `http://43.205.181.183:5000/api/Patient/AppointmentsData?patientId=${this.patientId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.medical_data = response; 
        console.log("Medical Details: ", this.medical_data);
        this.latest_medical_data = this.medical_data.sort((a, b) => 
          new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
        )[0];
        console.log("Latest Medical Details: ", this.latest_medical_data);
        this.calculateDiagnosisPercentage();
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching medical details', err);
        alert('Failed to load medical details. Please try again later.');
      }
    });
  }

  
  getPersonalInformation(): void {
    const apiUrl = `http://43.205.181.183:5000/api/Patient/PersonalInformation?PatientId=${this.patientId}`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.personal_data = response[0];
        console.log("Personal Information: ", this.personal_data);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching personal information', err);
        alert('Failed to load personal information. Please try again later.');
      }
    });
  }


calculateDiagnosisPercentage(): void {
  const diagnosisCount: Record<string, number> = this.medical_data.reduce(
    (acc: Record<string, number>, curr: any) => {
      console.log('Diagnosis value:', curr.diagonsis); 
      acc[curr.diagonsis] = (acc[curr.diagonsis] || 0) + 1;
      return acc;
    },
    {}
  );

  const totalAppointments: number = this.medical_data.length;
  const diagnosisLabels = Object.keys(diagnosisCount); 
  const diagnosisPercentages = Object.values(diagnosisCount).map(
    (count: number) => (count / totalAppointments) * 100  
  );
  console.log("Labels:", diagnosisLabels);
  
  this.chartOptions = {
    data: diagnosisPercentages.map((percentage, index) => ({
      label: diagnosisLabels[index],
      value: percentage
    })),
    series: [
      {
        type: 'donut',
        calloutLabelKey: 'label',
        angleKey: 'value',
        innerRadiusRatio: 0.7,
      } as any,
    ],
  };

  console.log('Diagnosis Percentage Data: ', this.chartOptions);
}

}