import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: "home",
        loadChildren: () => import("./home/home.module").then(h => h.HomeModule)
    },
    {
        path: "patient",
        loadChildren: () => import("./patient/patient.module").then(p=>p.PatientModule)
    },
    {
        path:"doctor",
        loadChildren:() => import("./doctor/doctor.module").then(d=>d.DoctorModule)
    }
];
