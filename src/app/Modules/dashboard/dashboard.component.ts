import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'aep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sites') sites : any;
  @ViewChild('slices') slices : any;
  isExpand : any = true;

  panelOpenState = false;

   constructor() {
    }

    ngOnInit(): void {
    }

  
  parentWillTakeAction(message : any){
    if(!this.isExpand){
      this.slices.expandAllCard();
      this.isExpand = false
   }else{
     this.slices.collapseAllCard();
     this.isExpand = true
   }
     this.slices.onSelectCard(message);
  }

  parentWillTakeForExpand(){
    if(this.isExpand){
       this.slices.expandAllCard();
       this.isExpand = false
    }else{
      this.slices.collapseAllCard();
      this.isExpand = true
    }
  }
  parentWillTakeActionSlice(message : any){
    this.isExpand =! this.isExpand;
  }




}
