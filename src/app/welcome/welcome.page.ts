import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';

import { SettingPage } from '../setting/setting.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(private modalCtrl: ModalController,
    private router : Router){}

  async openModalSetting() {
    let settingModal = await this.modalCtrl.create({
      component : SettingPage,
      initialBreakpoint : 0.5,
      breakpoints: [0, 0.5, 0.75, 1],
    });
    settingModal.present();
  }

  ngOnInit(): void {

  }

  login(){
    this.router.navigate(['./login']);
  }
}
