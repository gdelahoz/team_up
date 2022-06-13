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
    console.log('ASISTIRÉ');
  }

  openModalNoAssist(){
    console.log('NO ASISTIRÉ');
  }

  openDetailEvent(){
    console.log('VER DETALLE DEL EVENTO');
  }

}
