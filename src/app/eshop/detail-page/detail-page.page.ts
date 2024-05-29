import { Component, OnInit } from '@angular/core';
import {ClothInfo} from "../../interface/AllResponse";
import {DetailStorageService} from "../detail-storage/detail-storage.service";
import {GlobalComponent} from "../../global-component";

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit {
  productData: ClothInfo;
  arrayIndex: any;
  isFemale: boolean;
  defaultImage = "../../assets/Easywear_loading.gif";
  constructor(private DetailStorage: DetailStorageService,) { }

  ngOnInit() {
    this.initProductData();
    console.log("this.isFemale: " + this.isFemale);
  }

  initProductData(): void{
    this.productData = this.DetailStorage.getProductData();
    this.arrayIndex = this.DetailStorage.getArrayIndex();
    this.isFemale = this.DetailStorage.getisFemale();
  }

  addToFittingRoom() {
    //GlobalComponent.shoppingCartMap.set(this.isFemale?'f':'m' + this.productData.id, this.productData);

    //this.productData
    if (this.isFemale) {
      if (GlobalComponent.shoppingCart_F_lens < 20) {
        GlobalComponent.shoppingCart_F.push(this.productData);
        GlobalComponent.shoppingCart_F_lens++;
        GlobalComponent.fittingRoom.push(this.productData)
        console.log("GlobalComponent.shoppingCart_F.length: " + GlobalComponent.shoppingCart_F.length);
      }

    } else {
      if (GlobalComponent.shoppingCart_M_lens < 20) {
        GlobalComponent.shoppingCart_M.push(this.productData);
        GlobalComponent.shoppingCart_M_lens++;
        GlobalComponent.fittingRoom.push(this.productData)
        console.log("GlobalComponent.shoppingCart_M.length: " + GlobalComponent.shoppingCart_M.length);
      }
    }
  }

  removeFromFittingRoom() {
    if (this.isFemale) {
      GlobalComponent.shoppingCart_F.splice(this.arrayIndex, 1);
      GlobalComponent.shoppingCart_F_lens--;
      GlobalComponent.fittingRoom.splice(this.arrayIndex, 1);
    } else {
      GlobalComponent.shoppingCart_M.splice(this.arrayIndex, 1);
      GlobalComponent.shoppingCart_M_lens--;
      GlobalComponent.fittingRoom.splice(this.arrayIndex, 1);
    }
    // this.itemClicked = !this.itemClicked;
  }

}
