import { InteractionService } from '../../../services/interaction.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private interaction: InteractionService
  ) { }

  ngOnInit() {}

  goToLogin(){
    this.auth.logout();
    this.interaction.presentToast('Sesión finalizada.');
    this.router.navigate(['/login']);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

}
