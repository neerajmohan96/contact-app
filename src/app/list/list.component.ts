import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email:string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['Name','Email'] ;
  page:number = 0;
  pageEvent: PageEvent;
  per_page:number;
  total:number;
  contacts:any = new MatTableDataSource<Contact>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service:UserService
  ) { }

  ngOnInit(): void {
    this.service.getUsers("1").subscribe(
      response =>{
          this.contacts = response['data'];
          this.page = response['page']-1;
          this.per_page = response['per_page'];
          this.total = response['total'];
      },
      error =>{
        // handle error
      }
    );
  }
  public getServerData(event?:PageEvent){
    this.service.getUsers(event.pageIndex+1).subscribe(
      response =>{
        event.pageIndex = response['page'];
          this.contacts = response['data'];
          this.page = response['page'];
          this.per_page = response['per_page'];
          this.total = response['total'];
      },
      error =>{
        // handle error
      }
    );
    return event;
  }
  detailInfo(id){
    console.warn(id);
     
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contacts.filter = filterValue.trim().toLowerCase();
    this.table.renderRows();
  }
  sortColumn($event:Sort) {
    switch($event.active){
      case "Name":{
        if($event.direction=="asc"){
          this.contacts = this.contacts.sort((a,b)=>
          a.first_name>b.first_name?1:a.first_name<b.first_name?-1:0
          );
          this.table.renderRows();
        }
        else{
          this.contacts = this.contacts.sort((a,b)=>
          a.first_name<b.first_name?1:a.first_name>b.first_name?-1:0
        );
        this.table.renderRows();
        }
        break;
      }
      case "Email":{
        if($event.direction=="asc"){
          this.contacts = this.contacts.sort((a,b)=>
          a.email>b.email?1:a.email<b.email?-1:0
          );
          this.table.renderRows();
        }
        else{
          this.contacts = this.contacts.sort((a,b)=>
          a.email<b.email?1:a.email>b.email?-1:0
          );
          this.table.renderRows();
        }
        break;
      }
    }
      }


}
