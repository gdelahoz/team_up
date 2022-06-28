import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'team-card-advertising',
  templateUrl: './card-advertising.component.html',
  styleUrls: ['./card-advertising.component.scss'],
})
export class CardAdvertisingComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  
  constructor(private router: Router) { }

  ngOnInit() {}

  editAdvertising(){
    this.router.navigate(['tabs/home/create-announcements']);
  }

}
