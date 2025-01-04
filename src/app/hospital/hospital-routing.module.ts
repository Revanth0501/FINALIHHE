import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PendingappointmentsComponent } from './pendingappointments/pendingappointments.component';
import { ScheduledappointmentsComponent } from './scheduledappointments/scheduledappointments.component';
import { RejectedappointmentsComponent } from './rejectedappointments/rejectedappointments.component';

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
        path:'changepassword',
        component:ChangepasswordComponent
      },
      {
        path:'updateprofile',
        component:UpdateprofileComponent
      },
      {
        path:'contact',
        component:ContactusComponent
      },
      {
        path:'doctors',
        component:DoctorsComponent
      },
      {
        path:'pendingappointments',
        component:PendingappointmentsComponent
      },
      {
        path:'scheduledappointments',
        component:ScheduledappointmentsComponent
      },
      {
        path:'rejectedappointments',
        component:RejectedappointmentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }
