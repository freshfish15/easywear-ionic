import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-avatar-capture-entering-data',
  templateUrl: './avatar-capture-entering-data.component.html',
  styleUrls: ['./avatar-capture-entering-data.component.scss'],
})
export class AvatarCaptureEnteringDataComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


}
