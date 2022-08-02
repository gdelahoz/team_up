import { EventService } from 'src/app/services/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Team } from 'src/app/models/team';
import { PopoverAssistComponent } from '../popovers/popover-assist/popover-assist.component';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'team-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss'],
})
export class CardEventComponent implements OnInit {
  @Input() title: string;
  @Input() date: string;
  @Input() place: string;
  @Input() time: string;
  @Input() players: string;
  @Input() image: string;

  constructor( 
  ) { }

  ngOnInit() {}

}
