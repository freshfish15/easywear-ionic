import { ToastController } from '@ionic/angular';
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root',
})

export class FuncService{
  constructor(
    private toastController : ToastController
  ) {}
  async networkErrorAlert() {
    const toast = await this.toastController.create({
      message: 'Connection error, please check your network',
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

  async accountNotFound() {
    const toast = await this.toastController.create({
      message: 'Account Not Found!',
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

  async errorToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

}
