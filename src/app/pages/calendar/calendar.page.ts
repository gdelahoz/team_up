import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class calendarPage implements OnInit{

  ngOnInit(){}

  constructor(private router: Router) {}

  openCreateEvent(){
    this.router.navigate(['tabs/calendar/create-event']);
  }

}
