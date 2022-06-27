import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
