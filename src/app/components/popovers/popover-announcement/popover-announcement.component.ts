import { Team } from './../../../models/team';
import { Announcement } from './../../../models/announcement';
import { AnnouncementService } from './../../../services/announcement.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-announcement',
  templateUrl: './popover-announcement.component.html',
  styleUrls: ['./popover-announcement.component.scss'],
})
export class PopoverAnnouncementComponent implements OnInit {
  id: string;
  index: string;
  //@Output() messageEvent = new EventEmitter();

  constructor( 
    private nav: NavController,
    private annService: AnnouncementService,
    private popCtrl: PopoverController 
  ) { }

  ngOnInit() {
    console.log(this.index);
  }

  editAdvertising(){
    this.nav.navigateForward(['tabs/home/create-announcements']);
  }

  deleteAnnouncement(){
    //this.messageEvent.emit(this.index);
    const onClosedData: string = this.index;
    this.annService.deleteAnnouncements(this.id);
    this.popCtrl.dismiss(onClosedData);
  }

}
