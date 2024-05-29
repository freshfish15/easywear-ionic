import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-avatar-capture-entering-data',
  templateUrl: './avatar-capture-entering-data-guide.component.html',
  styleUrls: ['./avatar-capture-entering-data-guide.component.scss'],
})
export class AvatarCaptureEnteringDataGuideComponent implements OnInit {
  @ViewChild(IonSlides)
  slider!: IonSlides;
  siderPage = 0;
  async getInfo() {
    this.siderPage = await this.slider.getActiveIndex();
  }
  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  goToBodyCapture() {
    return this.modalCtrl.dismiss(null, 'bodyCapture');
  }
}
