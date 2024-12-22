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
        path:"activepatients",
        component:ActivepatientsComponent
      },
      {
        path:"inactivepatients",
        component:InactivepatientsComponent
      },
      {
        path:"activedoctors",
        component:ActivedoctorsComponent
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
