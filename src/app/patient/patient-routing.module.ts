import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MedicaldataComponent } from './medicaldata/medicaldata.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { ScheduledappointmentsComponent } from './scheduledappointments/scheduledappointments.component';
import { PendingappointmentsComponent } from './pendingappointments/pendingappointments.component';
import { PastappointmentsComponent } from './pastappointments/pastappointments.component';
import { RejectedappointmentsComponent } from './rejectedappointments/rejectedappointments.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  
  {
    path: '',
    component:NavbarComponent,
    
    children: [
      {
        path: 'navbar',
        component: NavbarComponent 
      },
      {
        path: 'bookappointment',
        component: BookappointmentComponent 
      },
      {
        path: 'medicalrecords',
        component: MedicaldataComponent
      },
      {
        path:'scheduledappointments',
        component:ScheduledappointmentsComponent
      },
      {
        path:'pendingappointments',
        component:PendingappointmentsComponent
      },
      {
        path:'pastappointments',
        component:PastappointmentsComponent
      },
      {
        path:'rejectedappointments',
        component:RejectedappointmentsComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'updateAccount',
        component:UpdateprofileComponent
      },
      {
        path:'updatePassword',
        component:ChangepasswordComponent
      },
      {
        path:'contactus',
        component:ContactusComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
