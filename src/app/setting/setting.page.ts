import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from '@ionic/angular';
import { ContactUsPage } from '../setting/contact-us/contact-us.page';
import { PrivacyPolicyPage } from '../setting/privacy-policy/privacy-policy.page';
import {GlobalComponent} from "../global-component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(public modalCtrl: ModalController,
              private alertController: AlertController,
              private navController: NavController,
              private router: Router) {}

  // async openModalContact() {
  //   let contactModal = await this.modalCtrl.create({
  //     component : ContactUsPage,
  //     initialBreakpoint : 0.9,
  //     breakpoints: [0, 0.5, 0.9, 1],
  //   });
  //   contactModal.present();
  // }

  // async openModalPrivacy() {
  //   let privacyModal = await this.modalCtrl.create({
  //     component : PrivacyPolicyPage,
  //     initialBreakpoint : 0.9,
  //     breakpoints: [0, 0.5, 0.9, 1],
  //   });
  //   privacyModal.present();
  // }
  dismiss(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  navigateToAccount(){
    if(GlobalComponent.token == undefined){
      console.log("id is undfined!")
      this.presentLogInAlert();
      return;
    }
    this.modalCtrl.dismiss(null, 'cancel');
    this.router.navigate(['../setting/manage-account'])
  }

  async presentLogInAlert() {
    const alert = await this.alertController.create({
      header: 'You have not logged in',
      cssClass: 'normal-alert',
      message: "Log in to manage your account",

      buttons:
        [{
          text: 'Log In',
          handler:data=>{
            // this.router.navigate(['login'])
            this.navController.navigateBack(['login']);
          }
        }],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
