import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalComponent } from 'src/app/global-component';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
})
export class EmailConfirmComponent implements OnInit {

  email = GlobalComponent.regUserEmail;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

}
