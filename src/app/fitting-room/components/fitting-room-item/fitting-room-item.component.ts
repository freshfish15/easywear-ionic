import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {EshopDetailComponent} from "../../../eshop/components/eshop-detail/eshop-detail.component";
import { UserService } from 'src/app/service/user.service';
import {GlobalComponent} from "../../../global-component";

@Component({
  selector: 'app-fitting-room-item',
  templateUrl: './fitting-room-item.component.html',
  styleUrls: ['./fitting-room-item.component.scss'],
})
export class FittingRoomItemComponent implements OnInit {

  @Input() itemData: any;
  @Input() ClothItemID: any;
  //@Input() itemData: number;
  @Input() arrayIndex: any;

  @Input() isFemale: any;
  @Output() removeSelf = new EventEmitter;
  defaultImage = "../../assets/Easywear_loading.gif";

  constructor(private modalCtrl: ModalController, private alertController: AlertController) {
  }

  ngOnInit() {
  }

  async openDetail(productData: any, arrayIndex: any, isFemale: boolean) {
    const modal = await this.modalCtrl.create({
      component: EshopDetailComponent,
      cssClass: 'customModalSetting',
      componentProps: {
        productData: productData,
        arrayIndex: arrayIndex,
        isFemale: isFemale,
      },
    });
    modal.present();

    await modal.onWillDismiss();
  }

  removeItself(): void {
    this.removeSelf.emit(this.arrayIndex);


  }

  getClothInfo(Cloth_ID: number){
    this.getClothInfo(Cloth_ID);
  }



  async removeItemAlert() {
    const alert = await this.alertController.create({
      header: 'Remove Item ?',
      message: 'Do you really want to remove the item from your fitting room ? All data will be lost.',
      buttons: [
        {
          text: 'Remove item',
          role: 'Remove_item',
          handler: () => {
            this.removeItself();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();
  }
}
