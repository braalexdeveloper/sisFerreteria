import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css']
})
export class ViewDetailComponent implements OnInit{
  @Input() detailSale:any;
  sale:any={};

  constructor(
    public activeModal:NgbActiveModal
  ){}
  ngOnInit(): void {
    this.sale=this.detailSale;
  }

 


}
