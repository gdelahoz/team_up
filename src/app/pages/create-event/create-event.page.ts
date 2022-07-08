import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createEvent(form){
    this.router.navigate(['/tabs/calendar']);
  }

}
