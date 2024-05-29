import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-avatar-capture-face-scanning',
  templateUrl: './avatar-capture-face-scanning.component.html',
  styleUrls: ['./avatar-capture-face-scanning.component.scss'],
})
export class AvatarCaptureFaceScanningComponent implements OnInit {


  constructor(private modalCtrl: ModalController,private navCtrl: NavController,) {
  }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
