import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pendingtickets',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pendingtickets.component.html',
  styleUrls: ['./pendingtickets.component.css'],
})
export class PendingticketsComponent implements OnInit, AfterViewInit, OnDestroy {
  rowsPerPage = 4;
  ticketIsuues: any[] = [];
  router = inject(Router);
  http = inject(HttpClient);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.GetIsuuesData();
  }

  ngAfterViewInit(): void {
    this.addCustomSearchListener();
  }

  ngOnDestroy(): void {
    if ($.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable().destroy();
    }
  }

  GetIsuuesData(): void {
    this.http.get<any[]>('http://43.205.181.183:5000/api/Admin/Tickets').subscribe({
      next: (data) => {
        this.ticketIsuues = data.filter((ticket) => ticket.status === 'Pending');
        this.cd.detectChanges();
        console.log('Fetched tickets:', this.ticketIsuues);
        this.initializeDataTable();
      },
      error: (error) => {
        console.error('Error fetching tickets:', error);
      },
    });
  }

  initializeDataTable(): void {
    if ($.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable().destroy();
    }

    $('#example').DataTable({
      pageLength: this.rowsPerPage,
      responsive: true,
      lengthMenu: [5, 10, 15, 20, 50, 100],
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
    $('#customSearch').on('keyup', () => {
      table.search((this as unknown as HTMLInputElement).value).draw();
    });
  }

  Solved(ticketId: string): void {
    console.log('Ticket ID passed to Solved:', ticketId);
    if (!ticketId) {
      console.error('ticketId is undefined or null');
      return;
    }

    const apiUrl = `http://43.205.181.183:5000/api/Admin/TicketIsuueSolved?id=${ticketId}`;
    this.http.put(apiUrl, {}).subscribe({
      next: () => {
        Swal.fire('Success', 'Ticket status updated successfully.', 'success');

        // Update the DataTable dynamically without reloading
        this.ticketIsuues = this.ticketIsuues.filter(
          (ticket) => ticket.ticketId !== ticketId
        );
        $('#example').DataTable().row(`#row-${ticketId}`).remove().draw();
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update ticket status.',
        });
      },
    });
  }
}
