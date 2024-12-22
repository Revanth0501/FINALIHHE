import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointmentdata',
  imports: [ReactiveFormsModule],
  templateUrl: './appointmentdata.component.html',
  styleUrl: './appointmentdata.component.css'
})
export class AppointmentdataComponent {
  appointmentForm!: FormGroup;
  appointmentId: string='';
  http=inject(HttpClient);
  router=inject(Router);
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.appointmentId = this.route.snapshot.paramMap.get('id') || '';

   
    this.appointmentForm = this.fb.group({
      appointmentId: [this.appointmentId],
      labtest: ['', Validators.required],
      diagonsis: ['', Validators.required],
      medication: ['', Validators.required],
      weight: [0, [Validators.required,Validators.pattern(/^\d+$/)]],
      prescritionnote: ['', Validators.required],
      blood_pressure: ['', Validators.required],
      heart_rate: [0, [Validators.required,Validators.pattern(/^\d+$/)]]
    }); 
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      if (this.appointmentForm.valid) {
        const sam=confirm("Have You Entered Correct Information")
        if(sam){
          const formData = this.appointmentForm.value;
          const payload = {

            appointmentId: formData.AppointmentId,
            labtest: formData.labtest,
            diagonsis: formData.diagonsis,
            medication: formData.medication,
            weight: parseInt(formData.weight, 10),
            prescritionnote:formData.prescritionnote,
            blood_pressure: parseFloat(formData.blood_pressure),
            heart_rate: parseInt(formData.heart_rate, 10),
          };
          
         
         
          this.http.post('https://localhost:7287/api/Hospital/AppointmentData', formData).subscribe(
            (response) => {
              console.log('Response:', response);
              Swal.fire('Data Submitted Successfully');
              this.appointmentForm.reset();
              this.router.navigate(['hospital/scheduledappointments']);
            },
            (error) => {
              
              console.error('Error:', error);
              Swal.fire('❌ An error occured.Please try agian later');
              this.appointmentForm.reset();
            }
          );
        }
      } else {
        alert('Please fill out the form correctly.');
      }
    }
  }
}

