import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-modal-absence',
  templateUrl: './modal-absence.component.html',
  styleUrls: ['./modal-absence.component.scss'],
})
export class ModalAbsenceComponent implements OnInit {
  eventId: any;
  userId: any;

  constructor(
    private modalCtrl: ModalController,
    private eventService: EventService,
  ) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(info) {
    this.eventService.addAbsence(this.eventId, this.userId, info.value);
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
