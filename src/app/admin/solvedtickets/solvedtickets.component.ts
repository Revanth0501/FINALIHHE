import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';

@Component({
  selector: 'app-solvedtickets',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './solvedtickets.component.html',
  styleUrl: './solvedtickets.component.css'
})
export class SolvedticketsComponent implements OnInit{

  constructor(private cd: ChangeDetectorRef) {}

  rowsPerPage = 5;
  http=inject(HttpClient);
  rowOptions = [3, 5, 10, 25, 50, 100];
  solvedTickets:any;
  router=inject(Router);

  GetIsuuesData():void{
      this.http.get("http://43.205.181.183:5000/api/Admin/Tickets").subscribe((data:any)=>{
        this.solvedTickets=data.filter((data:{ status:string})=>data.status==='Solved');
        console.log("Data",data);
        this.cd.detectChanges();
        console.log("counties",this.solvedTickets);
      },(error)=>{
        console.log(error);
      });
  }
  

  ngAfterViewInit(): void {
    this.initializeDataTable();
    this.addCustomSearchListener();
  }

  initializeDataTable(): void {
    $('#example').DataTable({
      pageLength: this.rowsPerPage,
      responsive: true,
      destroy: true,
      lengthMenu: [5, 10, 15, 20],
      dom: "<'row'<'col-md-11 text-left'f><'col-md-1 text-right'l>>" +
      "<'row'<'col-md-12'tr>>" +
     "<'row'<'col-md-9'i><'col-md-3 text-right'p>>'",
      language: {
        lengthMenu: '_MENU_',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        infoEmpty: 'No entries to show',
        infoFiltered: '(filtered from _MAX_ total entries)',
      },
    });
  }

  addCustomSearchListener(): void {
    const table = $('#example').DataTable();
    $('#customSearch').on('keyup', function () {
      table.search((this as HTMLInputElement).value).draw();
    });
  }

  ngOnDestroy(): void {
    if ($.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable().destroy();
    }
  }
  ngOnInit(): void {
    this.GetIsuuesData();
  }
 
  
 

}


