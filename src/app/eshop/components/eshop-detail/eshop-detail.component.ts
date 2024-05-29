import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common'
import {ModalController, NavParams} from '@ionic/angular';
import {GlobalComponent} from "../../../global-component";
import {DetailStorageService} from "../../detail-storage/detail-storage.service";
import {ClothInfo} from "../../../interface/AllResponse";

@Component({
  selector: 'app-eshop-detail',
  templateUrl: './eshop-detail.component.html',
  styleUrls: ['./eshop-detail.component.scss'],
})

export class EshopDetailComponent implements OnInit {
  brand;
  //brand: any;
  productData: ClothInfo;
  arrayIndex: any;
  fittingRoom: any;
  colorSelected = 0;
  isFemale: boolean | undefined;
  defaultImage = "../../assets/Easywear_loading.gif";

  itemClicked: boolean = false;

  constructor(private location: Location,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private DetailStorage: DetailStorageService) {
              //this.productData = this.navParams.get('productData');
  }

  ngOnInit() {
    console.log(`${this.brand}`)
    // this.productData = this.navParams.data['productData'];
    // this.arrayIndex = this.navParams.data['arrayIndex'];
    // this.isFemale = this.navParams.data['isFemale'];
    //this.productData = this.DetailStorage.getProductData()
    console.log(this.productData.description);
  }

  tempAddtoBag = true;

  addToBag(): void {
    if (this.tempAddtoBag) {
      this.tempAddtoBag = false;
    } else {
      this.tempAddtoBag = true;
    }
  }

  back(): void {

    this.location.back()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  addToFittingRoom() {
    //this.productData
    if (this.isFemale) {
      if (GlobalComponent.shoppingCart_F_lens < 20) {
        //GlobalComponent.shoppingCart_F.push(this.productData);
        GlobalComponent.shoppingCart_F_lens++;
        ///GlobalComponent.fittingRoom.push(this.productData)
        console.log(GlobalComponent.fittingRoom.length);
      }

    } else {
      if (GlobalComponent.shoppingCart_M_lens < 20) {
        //GlobalComponent.shoppingCart_M.push(this.productData);
        GlobalComponent.shoppingCart_M_lens++;
        //GlobalComponent.fittingRoom.push(this.productData)
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


  inShoppingCart() {
    if (this.isFemale) {
      return GlobalComponent.shoppingCart_F.includes(this.productData);

    } else {
      return GlobalComponent.shoppingCart_M.includes(this.productData);

    }
  }

  selectColor(temp: number) {
    this.colorSelected = temp;
  }


  protected readonly GlobalComponent = GlobalComponent;
}
