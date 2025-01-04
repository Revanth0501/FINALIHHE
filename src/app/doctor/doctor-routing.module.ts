import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientmedicaldataComponent } from './patientmedicaldata/patientmedicaldata.component';
import { UpdateappointmentdataComponent } from './updateappointmentdata/updateappointmentdata.component';

const routes: Routes = [
  {
    path:'',
    component:NavbarComponent,

    children:[
      {
        path:'navbar',
        component:NavbarComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'update-profile',
        component:UpdateprofileComponent
      },
      {
        path:'change-password',
        component:ChangepasswordComponent
      },
      {
        path:'contactus',
        component:ContactusComponent
      },
      {
        path:'appointment',
        component:AppointmentsComponent
      },
      {
        path:'patientmedicaldata/:id',
        component:PatientmedicaldataComponent
      },
      {
        path:'updateappointment/:id',
        component:UpdateappointmentdataComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
