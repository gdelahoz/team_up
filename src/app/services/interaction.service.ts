import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class InteractionService {

  loading: any;

  constructor(
    public toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  async showLoading(mensaje: string) {
    this.loading = await this.loadingCtrl.create({
      message: mensaje,
    });
    
    await this.loading.present();
  }

  async closeLoading() {
    await this.loading.dismiss();
  }
}
