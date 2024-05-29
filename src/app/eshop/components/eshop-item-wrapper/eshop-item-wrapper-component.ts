import {Component, Input, OnInit} from '@angular/core';
import {GlobalComponent} from "../../../global-component";
import {EshopDetailComponent} from "../eshop-detail/eshop-detail.component";
import {ModalController, NavParams} from "@ionic/angular";
import {ClothInfo} from "../../../interface/AllResponse";


@Component({
  selector: 'app-eshop-item-wrapper',
  templateUrl: './eshop-item-wrapper.component.html',
  styleUrls: ['./eshop-item-wrapper.component.scss'],
})

export class EshopItemWrapperComponent implements  OnInit {
  productData: any;
  arrayIndex: any;
  colorSelected = 0;
  isFemale: boolean | undefined;

  @Input()
  // //defaultImage = "../../assets/Easywear_loading.gif";
  // //colorSelected= 0;
  itemClicked: boolean = false;

  constructor(/*private navParams: NavParams*/) {
  }

  ngOnInit() {
    // this.arrayIndex = this.navParams.data['productData'];
    // this.arrayIndex = this.navParams.data['arrayIndex'];
    // this.isFemale = this.navParams.data['isFemale'];
  }

  toggleClickedItem() {
    this.itemClicked = !this.itemClicked;
  }

  addToFittingRoomDirectly() {
    if (this.isFemale) {
      if (GlobalComponent.shoppingCart_F_lens < 20) {
        GlobalComponent.shoppingCart_F.push(this.productData);
        GlobalComponent.shoppingCart_F_lens++;
      }

    } else {
      if (GlobalComponent.shoppingCart_M_lens < 20) {
        GlobalComponent.shoppingCart_M.push(this.productData);
        GlobalComponent.shoppingCart_M_lens++;
      }
    }
  }

  selectColor(temp: number) {
    this.colorSelected = temp;
  }


}

