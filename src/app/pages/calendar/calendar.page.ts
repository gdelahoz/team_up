import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class calendarPage implements OnInit{

  ngOnInit(){}

  constructor() {}

  openCreateEvent(){
    console.log('CREAR EVENTO');
  }

}
