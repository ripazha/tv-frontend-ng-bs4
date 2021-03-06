import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/_service/entry.service';
import { HttpParams } from '@angular/common/http';
import { Entry } from 'src/app/_class/entry';
import { Pagination } from 'src/app/_class/pagination';

@Component({
  selector: 'app-entry-admin',
  templateUrl: './entry-admin.component.html',
  styleUrls: ['./entry-admin.component.css']
})
export class EntryAdminComponent implements OnInit {

  constructor(private entryService:EntryService) { }

  entries:Entry[]=[];
  pagination = new Pagination({page:1});
  
  async OnPageChange(e:number){
    this.pagination.page=e;
    var { body } = await this.entryService.GetAll(this.pagination.Params()).toPromise();
    this.entries=body;
  }

  async RescueData()
  {
    var { headers, body } = await this.entryService.GetAll(this.pagination.Params()).toPromise();
    this.pagination.Load(headers);
    this.entries=body;
  }

  OnUpdatePerPage(e)
  {
    this.pagination.perPage=e;
    this.RescueData();
  }

  OnFilterChange(e){
    var key = 'filter[title][like]';
    if(e){
      this.pagination.AddParams(key,e);
    }else{
      this.pagination.DelParams(key)
    }
    this.RescueData();
  }

  ngOnInit() {
    this.RescueData();
  }

}
