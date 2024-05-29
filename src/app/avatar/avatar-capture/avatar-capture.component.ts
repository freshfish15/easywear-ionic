import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-avatar-capture',
  templateUrl: './avatar-capture.component.html',
  styleUrls: ['./avatar-capture.component.scss'],
})
export class AvatarCaptureComponent implements OnInit {

  defaultImage = "../../assets/Easywear_loading.gif";

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000
    }
  };
  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  goToFaceCapture() {
    return this.modalCtrl.dismiss(null, 'faceCapture');
  }
}
