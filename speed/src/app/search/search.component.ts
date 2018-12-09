import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  criterias = [];
  items;
  filtered = [];
  selection: string;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getData();
  }
  onSelection(selection) {
  this.selection = selection;
  switch (this.selection) {
    case 'Agencias':
      this.commonService.getAgencies().subscribe(d => this.criterias = d);
      break;
    case 'Estados':
      this.commonService.getStatusTypes().subscribe(d => this.criterias = d);
      break;
    case 'Tipos':
      this.commonService.getMissionTypes().subscribe(d => this.criterias = d);
      break;
  }
  }
  onCriteriaSelection = e => {
    console.log(e);
    this.getFilteredResults(e);
  }
 getFilteredResults = (e) => {
  switch (this.selection) {
    case 'Agencias':
      this.filterByAgency(e);
      break;
    case 'Estados':
      this.filterByStatus(e);
      break;
    case 'Tipos':
      this.filterByTypes(e);
      break;
  }
 }
 filterByStatus = (e: any) => {
  this.filtered = this.items.filter(l => l.status === e.id);
 }
 filterByAgency = (e: any) => {
   this.filtered = this.items.filter(l => {
     if (l.lsp) {
       return l.lsp.id === e.id;
     }
   });
 }
 filterByTypes = (e: any) => {
   this.filtered = this.items.filter(l => {
     if (l.missions[0]) {
      return l.missions[0].type === e.id;
     }
   });
 }
 getData = () => {
   this.commonService.getLaunches().subscribe(d => this.items = d);
 }

}



