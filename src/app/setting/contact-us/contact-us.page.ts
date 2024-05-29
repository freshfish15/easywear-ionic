import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(private modalCtrl: ModalController){}

  dismiss(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
  }

}
