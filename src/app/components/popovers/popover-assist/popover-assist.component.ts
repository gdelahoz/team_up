import { Event } from './../../../models/event';
import { ModalController, PopoverController, NavController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user';
import { ModalAbsenceComponent } from '../../modals/modal-absence/modal-absence.component';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-popover-assist',
  templateUrl: './popover-assist.component.html',
  styleUrls: ['./popover-assist.component.scss'],
})
export class PopoverAssistComponent implements OnInit {
  userId: string;
  eventId: string;
  index: string;
  eventData: Event;

  attArray = [];
  absArray = [];

  constructor(
    private eventService: EventService,
    private intService: InteractionService, 
    private popCtrl: PopoverController,
    private modalCtrl: ModalController,
    private nav: NavController
  ) { }

  async ngOnInit() {
    await this.getEventData(this.eventId);
    await this.getAttendance();
    await this.getAbsence();
  }

  // Obtenemos los datos de los eventos

  async getEventData(id){
    this.eventData = await new Promise((resolve) => {
      this.eventService.getEventData(id).subscribe(res => {
        resolve(res);
      });
    });
  }

  // Obtenemos los datos de asistencia e inasistencia

  async getAttendance(){
    if (this.eventData) {
      this.eventData.attendance.forEach(att => {
        this.attArray.push(att['userId']);
      });
      //console.log('Array de asistencias: ',this.attArray);
    }
  }

  async getAbsence(){
    if (this.eventData) {
      this.eventData.absence.forEach(abs => {
        this.absArray.push(abs['userId']);
      });
      //console.log('Array de inasistencias: ',this.absArray);
    }
  }

  //Funciones para los botones en el popover

  assist(){
    console.log('ASISTIRÉ');

    const onClosedData: string = this.index;
    this.eventService.addAttendance(this.eventId, this.userId);
    this.popCtrl.dismiss(onClosedData);
  }

  async openModalNoAssist(){
    console.log('NO ASISTIRÉ');

    const modal = await this.modalCtrl.create({
      component: ModalAbsenceComponent,
      componentProps: {eventId: this.eventId, userId: this.userId}
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.intService.presentToast('Se ha añadido tu inasistencia.');
      this.popCtrl.dismiss();
    }
  }

  goToDetailEvent(){
    this.popCtrl.dismiss();
    this.nav.navigateForward(['/tabs/calendar/event-detail/' + this.eventId]);
  }

}
