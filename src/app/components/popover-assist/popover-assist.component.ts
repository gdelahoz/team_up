import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover-assist',
  templateUrl: './popover-assist.component.html',
  styleUrls: ['./popover-assist.component.scss'],
})
export class PopoverAssistComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  assist(){
    console.log('ASISTIRĂ‰');
  }

  openModalNoAssist(){
    console.log('NO ASISTIRĂ‰');
  }

  openDetailEvent(){
    console.log('VER DETALLE DEL EVENTO');
  }

}
