import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private patientId:number=0;
  private doctorId:string='';
  private hospitalId:string='';

  constructor() { }
  
  setPatientId(id:number)
  {
    this.patientId=id;
  }
  getPatientId()
  {
    return this.patientId;
  }
  setDoctorId(id:string)
  {
    this.doctorId=id;
  }
  getDoctorId()
  {
    return this.doctorId;
  }
  setHospitalId(id:string)
  {
    this.hospitalId=id;
  } 
  getHospitalId()
  {
    return this.hospitalId;
  }

}
