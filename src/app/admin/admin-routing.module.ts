import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivepatientsComponent } from './activepatients/activepatients.component';
import { InactivepatientsComponent } from './inactivepatients/inactivepatients.component';
import { ActivedoctorsComponent } from './activedoctors/activedoctors.component';
import { InactivedoctorsComponent } from './inactivedoctors/inactivedoctors.component';
import { VisitedappointmentsComponent } from './visitedappointments/visitedappointments.component';
import { NonvisitedappointmentsComponent } from './nonvisitedappointments/nonvisitedappointments.component';
import { PendingticketsComponent } from './pendingtickets/pendingtickets.component';
import { SolvedticketsComponent } from './solvedtickets/solvedtickets.component';
import { ActivehospitalsComponent } from './activehospitals/activehospitals.component';
import { InactivehospitalsComponent } from './inactivehospitals/inactivehospitals.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { HospitalprofileComponent } from './hospitalprofile/hospitalprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"",
    component:NavbarComponent,
    children:[
      {
        path:"navbar",
        component:NavbarComponent
      },
      {
        path:"dashboard",
        component:DashboardComponent
      },
      {
        path:"activepatients",
        component:ActivepatientsComponent
      },
      {
        path:"inactivepatients",
        component:InactivepatientsComponent
      },
      {
        path:"patientprofile",
        component:PatientprofileComponent
      },
      {
        path:"activedoctors",
        component:ActivedoctorsComponent
      },
      
      {
        path:"doctorprofile",
        component:DoctorprofileComponent
      },
      {
        path:"inactivedoctors",
        component:InactivedoctorsComponent
      },
      {
        path:"activehospitals",
        component:ActivehospitalsComponent
      },
      {
        path:"hospitalprofile",
        component:HospitalprofileComponent
      },
      {
        path:"inactivehospitals",
        component:InactivehospitalsComponent
      },
      {
        path:"visitedappointments",
        component:VisitedappointmentsComponent
      },
      {
        path:"nonvisitedappointments",
        component:NonvisitedappointmentsComponent
      },
      {
        path:"pendingtickets",
        component:PendingticketsComponent
      },
      {
        path:"solvedtickets",
        component:SolvedticketsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
 }
