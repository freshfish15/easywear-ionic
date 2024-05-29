import {Component, Input, OnInit} from '@angular/core';
import {GlobalComponent} from "../../../global-component";
import {EshopDetailComponent} from "../eshop-detail/eshop-detail.component";
import {ModalController} from "@ionic/angular";
import {ClothInfo} from "../../../interface/AllResponse";
import {DetailStorageService} from "../../detail-storage/detail-storage.service";

@Component({
  selector: 'app-eshop-item',
  templateUrl: './eshop-item.component.html',
  styleUrls: ['./eshop-item.component.scss'],
})


export class EshopItemComponent implements OnInit {

  @Input() productData: ClothInfo;
  defaultImage = "../../assets/Easywear_loading.gif";
  colorSelected= 0;
  itemClicked: boolean = false;

  constructor(private modalCtrl: ModalController,
              private detailStorage: DetailStorageService) {
  }

  ngOnInit() {
  }
  toggleClickedItem() {
    this.itemClicked = !this.itemClicked;
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
    this.detailStorage.setProductData(productData);
    modal.present();

    await modal.onWillDismiss();
  }

  protected readonly alert = alert;
  protected readonly open = open;

  addToFittingRoomDirectly(producData: ClothInfo){
    if(true){
      if (GlobalComponent.shoppingCart_F_lens < 20) {
        GlobalComponent.shoppingCart_F.push(this.productData);
        //GlobalComponent.ShoppingCart_F_ID_list.push(this.productData.ID);
        GlobalComponent.shoppingCart_F_lens++;
        GlobalComponent.fittingRoom.push(this.productData)

      }
    }else {
      if (GlobalComponent.shoppingCart_M_lens < 20) {
        GlobalComponent.shoppingCart_M.push(this.productData);
        //GlobalComponent.ShoppingCart_M_ID_list.push(this.productData.ID);
        GlobalComponent.shoppingCart_M_lens++;
        GlobalComponent.fittingRoom.push(this.productData)
      }
    }

    //alert("G.shoppingCart_M_lens: " + GlobalComponent.shoppingCart_M_lens + "/nG.shoppingCart_F_lens: " + GlobalComponent.shoppingCart_F_lens);
  }

}
