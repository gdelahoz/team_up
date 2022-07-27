import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-card-infoteam',
  templateUrl: './card-infoteam.component.html',
  styleUrls: ['./card-infoteam.component.scss'],
})
export class CardInfoteamComponent implements OnInit {
  @Input() title: string;
  @Input() team: string;
  @Input() info: string;
  @Input() image: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  editInfoTeam(){
    this.router.navigate(['/tabs/home/team-update']);
  }
}
