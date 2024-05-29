import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {EshopDetailComponent} from './components/eshop-detail/eshop-detail.component';
import {EshopItemWrapperComponent} from "./components/eshop-item-wrapper/eshop-item-wrapper-component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalComponent} from "../global-component";
import { environment } from 'src/environments/environment';
import {ClothInfo, ClothListResponse, FailedData, UserInfoSuccessData} from '../interface/AllResponse';
import {Browser} from "@capacitor/browser";
import {DetailStorageService} from './detail-storage/detail-storage.service'
import { OverlayEventDetail } from '@ionic/core/components';
import {Router} from "@angular/router";

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.page.html',
  styleUrls: ['./eshop.page.scss'],
})
export class EshopPage implements OnInit {

  isFemale = false;
  f_Top = true;
  f_Skirt = false;
  f_Pants = false;
  f_Dress = false;
  f_Coat = false;
  f_Acc = false;


  private data: any;
  cloth_list: ClothInfo[];

  constructor(private modalCtrl: ModalController,
              private http: HttpClient,
              private navController: NavController,
              private detailStorage: DetailStorageService,
              private alertController: AlertController,
              private router: Router,) {
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    })
  };

  updateProductList(isFemale: boolean, clothType: String) {
    let gender;
    gender = "M";
    if (isFemale) {
      gender = "F";
    }
    let url = environment.host + "/categoryClothList?gender=" + gender + "&category=" + clothType;
    this.http.get<ClothListResponse>(url).subscribe(
      (response: ClothListResponse) => {
        // TODO : (done) make productList = cloth_list, mabye need to change the attribute name in html
        if (response.status == 'failed') {
          let data = <FailedData>response.data;

          // TODO: How to show the failed message?
          console.log(data.message);
          return;
        }
        // Success
        // this.productList = response;
        this.cloth_list = response.data.cloth_list;
        //console.log("clothlist last element: " + this.cloth_list[this.cloth_list.length-1].name);
      },
      (e: Error) => {
        // TODO: error handling
        //alert(Error.toString());
        // this.openModal();
      }
    );
  }

  ngOnInit() {
    this.updateProductList(false, "Top");
    //this.updateProductList(true,"Top");
    this.updateProductList(false, "Acc");
    //this.updateProductList(true,"Acc");
    this.updateProductList(false, "Pants");
    //this.updateProductList(true,"Pants");
    this.updateProductList(true, "Skirt");
    //this.updateProductList(false,"Coat");
    this.updateProductList(true, "Coat");
    //this.updateProductList(true,"Dress");

    this.startAutomaticRefresh()
  }

  async openDetail(productData: any, arrayIndex: any, isFemale: boolean) {
    // const modal = await this.modalCtrl.create({
    //   component: EshopDetailComponent,
    //   cssClass: 'customModalSetting',
    //   componentProps: {
    //     brand: "ssbrand",
    //     // description: productData.description,
    //     // productData: productData,
    //     // arrayIndex: arrayIndex,
    //     // isFemale: isFemale,
    //     //productData: productData
    //   },
    // });
    //
    // this.detailStorage.setProductData(productData);
    // //console.log(productData)
    // modal.present();
    //
    // await modal.onWillDismiss();
    this.detailStorage.setProductData(productData);
    this.detailStorage.setArrayIndex(arrayIndex);
    this.detailStorage.setisFemale(isFemale);
    this.router.navigate(['./eshop/detail-page']);
  }

  filter_M() {
    this.updateProductList(false, "Top");
    this.updateProductList(false, "Acc");
    this.updateProductList(false, "Pants");
    this.updateProductList(true, "Skirt");
    this.updateProductList(true, "Coat");
    this.isFemale = false;
    // this.f_Top = true;
    // this.f_Skirt = false;
    // this.f_Pants = false;
    // this.f_Acc = false;
    // this.f_Coat = false;
    // this.f_Dress = false;
  }

  filter_F() {
    this.updateProductList(true, "Top");
    this.updateProductList(true, "Acc");
    this.updateProductList(true, "Pants");
    this.updateProductList(true, "Coat");
    this.updateProductList(true, "Dress");
    //this.updateProductList(true,"Dress");
    // this.updateProductList(true,"Top");
    this.isFemale = true;
    // this.f_Top = false;
    // this.f_Skirt = true;
    // this.f_Pants = false;
    // this.f_Acc = false;
    // this.f_Coat = false;
    // this.f_Dress = false;
  }

  filter_Top() {
    this.updateProductList(false, "Top");
    if (this.isFemale) {
      this.updateProductList(true, "Top");
    }
    this.f_Top = true;
    this.f_Skirt = false;
    this.f_Pants = false;
    this.f_Acc = false;
    this.f_Coat = false;
    this.f_Dress = false;
  }

  filter_Skirt() {
    this.updateProductList(false, "Skirt");
    if (this.isFemale) {
      this.updateProductList(true, "Skirt");
    }
    this.f_Top = false;
    this.f_Skirt = true;
    this.f_Pants = false;
    this.f_Acc = false;
    this.f_Coat = false;
    this.f_Dress = false;
  }

  filter_Pants() {
    this.updateProductList(false, "Pants");
    if (this.isFemale) {
      this.updateProductList(true, "Pants");
    }
    this.f_Top = false;
    this.f_Skirt = false;
    this.f_Pants = true;
    this.f_Acc = false;
    this.f_Coat = false;
    this.f_Dress = false;
  }

  filter_Dress() {
    this.updateProductList(false, "Dress");
    if (this.isFemale) {
      this.updateProductList(true, "Dress");
    }
    this.f_Top = false;
    this.f_Skirt = false;
    this.f_Pants = false;
    this.f_Acc = false;
    this.f_Coat = false;
    this.f_Dress = true;
  }

  filter_Coat() {
    this.updateProductList(false, "Coat");
    if (this.isFemale) {
      this.updateProductList(true, "Coat");
    }

    this.f_Top = false;
    this.f_Skirt = false;
    this.f_Pants = false;
    this.f_Acc = false;
    this.f_Coat = true;
    this.f_Dress = false;
  }

  filter_Acc() {
    this.updateProductList(false, "Acc");
    if (this.isFemale) {
      this.updateProductList(true, "Acc");
    }

    this.f_Top = false;
    this.f_Skirt = false;
    this.f_Pants = false;
    this.f_Acc = true;
    this.f_Coat = false;
    this.f_Dress = false;
  }

  badgeNumber: number = 0;

  startAutomaticRefresh() {
    setInterval(() => {
      this.refreshBadgeNumber();
    }, 1000); // Refresh every 5 seconds (adjust the interval as needed)
  }

  refreshBadgeNumber() {
    // Perform logic to update the badge number, e.g., make an API call
    this.badgeNumber = GlobalComponent.shoppingCart_M_lens + GlobalComponent.shoppingCart_F_lens;
    // and update the 'badgeNumber' property
  }

  async presentARWorldAlert() {
    if(GlobalComponent.fittingRoom.length == 1){
      const alert = await this.alertController.create({
        cssClass: 'normal-alert',
        message: "Select cloth to go to AR World",

        buttons:
          [{
              text: 'Confirm',
              handler: data => {
              }
            }],
      });
      alert.present();
    }else {

      const alert = await this.alertController.create({
        header: 'Go to AR World',
        cssClass: 'normal-alert',
        message: "This will open system browser",

        buttons:
          [{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
            {
              text: 'Confirm',
              handler: data => {
                this.OpenBrower();
                console.log("confirm")
                // this.requestMotionPermission();
              }
            }],
      });
      await alert.present();
    }

  }

  RefreshM(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.filter_M();
      event.target.complete();
    }, 2000);
  }

  RefreshF(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.filter_F();
      event.target.complete();
    }, 2000);
  }

  OpenBrower() {

    const ARWorldURL = "https://eshop.cafilab.com/?id="+ GlobalComponent.fittingRoom[1].id + "&token=Bearer%20" + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIn0.UpBgrA-TbGG5mX6C_4G-gvxOCsnX06Z6yWSwKv_TLRk"//GlobalComponent.token; //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIn0.UpBgrA-TbGG5mX6C_4G-gvxOCsnX06Z6yWSwKv_TLRk" //GlobalComponent.token; //"Bearer%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdHJpbmcifQ.AGG0PPmzsmljcA0Y79jKhrreIAgJr071EJQq8Ngrm6k&lang=EN"
    const openSite = async () => {
      await Browser.open({url: ARWorldURL});
    };
    openSite();
  }

  async goToAR() {
    if (GlobalComponent.token == undefined) {
      console.log("token is undfined!")
      this.presentLogInAlert();
      return;
    }
    this.presentARWorldAlert();
  }

  async presentLogInAlert() {
    const alert = await this.alertController.create({
      header: 'You have not logged in',
      cssClass: 'normal-alert',
      message: "Log in to create new avatar",

      buttons:
      //   [{
      //   text: 'Cancel',
      //   role: 'cancel',
      //   handler: () => {
      //   }
      // },
        [{
          text: 'Log In',
          handler:data=>{
            // this.router.navigate(['login'])
            this.navController.navigateBack(['login']);
          }
        }],
    });
    await alert.present();
  }


}
