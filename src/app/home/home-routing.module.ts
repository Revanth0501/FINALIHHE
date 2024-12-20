import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { HospitalRegistrationComponent } from './hospital-registration/hospital-registration.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';

const routes: Routes = [
  {
    path:'',
    component:MainPageComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"hospital",
    component:HospitalRegistrationComponent
  },
  {
    path:"patients",
    component:PatientRegistrationComponent
  },
  {
    path:"doctors",
    component:DoctorRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
