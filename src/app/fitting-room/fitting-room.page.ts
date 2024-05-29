import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {GlobalComponent} from "../global-component";
import {UserService} from "../service/user.service";
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-fitting-room',
  templateUrl: './fitting-room.page.html',
  styleUrls: ['./fitting-room.page.scss'],
})
export class FittingRoomPage implements OnInit {

  defaultImage = "../../assets/Easywear_loading.gif";
  isFemale = false;
  isFemaleFilter = false;
  shoppingCart = GlobalComponent.shoppingCart_M;
  shoppingCart_M = GlobalComponent.shoppingCart_M;
  shoppingCart_F = GlobalComponent.shoppingCart_F;
  shoppingCart_F_lens = GlobalComponent.shoppingCart_F.length;
  shoppingCart_M_lens = GlobalComponent.shoppingCart_M.length;

  constructor(private alertController: AlertController,
              private navController: NavController,
              public userService : UserService) {
  }

  ngOnInit() {
    //this.startAutomaticRefresh()
    console.log("GlobalComponent.shoppingCart_F.length: " + GlobalComponent.shoppingCart_F.length);
    console.log("GlobalComponent.shoppingCart_M.length: " + GlobalComponent.shoppingCart_M.length);
    console.log("this.shoppingCart_M_lens " + this.shoppingCart_M_lens);
    console.log("this.shoppingCart_F_lens " + this.shoppingCart_F_lens);
    //this.remove_initial_item();
  }


  syncGlobal() {
    if (this.isFemale) {
      this.shoppingCart_F = this.shoppingCart;
      GlobalComponent.shoppingCart_F = this.shoppingCart;
    } else {
      this.shoppingCart_M = this.shoppingCart;
      GlobalComponent.shoppingCart_M = this.shoppingCart;
    }
    GlobalComponent.shoppingCart_M_lens = this.shoppingCart_M_lens;
    GlobalComponent.shoppingCart_F_lens = this.shoppingCart_F_lens;
  }

  filter_M() {

    this.isFemaleFilter = false;
    this.shoppingCart = this.shoppingCart_M;
  }

  filter_F() {

    this.isFemaleFilter = true;
    this.shoppingCart = this.shoppingCart_F;
  }


  removeItem(event: any): void {
    delete this.shoppingCart[event];
    if (this.isFemale) {
      GlobalComponent.shoppingCart_F_lens--;
      this.shoppingCart_F_lens--;
    } else {
      GlobalComponent.shoppingCart_M_lens--;
      this.shoppingCart_M_lens--;
    }
    //this.syncGlobal();

    //alert ("G.shoppingCart_M_lens: " + GlobalComponent.shoppingCart_M_lens + "/nG.shoppingCart_F_lens: " + GlobalComponent.shoppingCart_F_lens);
  }

  removeAllItem(): void {

      for (let i = 0; i < 20; i++) {
        delete this.shoppingCart_F[i];
        GlobalComponent.shoppingCart_F_lens = 0;
        this.shoppingCart_F_lens = 0;
        GlobalComponent.shoppingCart_F_lens = 0;
      }
      for (let i = 0; i < 20; i++) {
        delete this.shoppingCart_M[i];
      }
      GlobalComponent.shoppingCart_M_lens = 0;
      this.shoppingCart_M_lens = 0;
      GlobalComponent.shoppingCart_M_lens = 0;



    this.syncGlobal();
  }

  async removeAllItemAlert() {
    const alert = await this.alertController.create({

      header: 'Remove All Item ?',
      message: 'Do you really want to remove all the item from your fitting room ? All data will be lost.',
      buttons: [
        {
          text: 'Remove all',
          role: 'Remove_all',
          handler: () => {
            this.removeAllItem();
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

  //refresh the Cloth number in shopping cart
  startAutomaticRefresh() {
    setInterval(() => {
      this.refreshBadgeNumber();
    }, 1000); // Refresh every 1 seconds (adjust the interval as needed)
  }

  refreshBadgeNumber() {
    // and update the 'shoppingCart lens' property
    this.shoppingCart_M_lens = GlobalComponent.shoppingCart_M_lens;
    this.shoppingCart_F_lens = GlobalComponent.shoppingCart_F_lens;
    console.log("this.shoppingCart_M.length " + this.shoppingCart_M.length);
    console.log("this.shoppingCart_F.length " + this.shoppingCart_F.length);
  }

  async goToAR() {
    if (GlobalComponent.token == undefined) {
      console.log("token is undfined!")
      this.presentLogInAlert();
      return;
    }else{
      this.onPostClothToFittingRoom();

    }

  }

  onPostClothToFittingRoom(){
    for(let i =0; i<this.shoppingCart_F.length; i++){
      console.log("onPostClothToFittingRoom Cloth id: " + GlobalComponent.fittingRoom[i].id)
      this.userService.addToFittingRoom(GlobalComponent.userid, GlobalComponent.fittingRoom[i].id).subscribe(response => {
        console.log(response.data);
      })
    }

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

  async goToARWorld() {
    if (GlobalComponent.token == undefined) {
      console.log("token is undfined!")
      this.presentLogInAlert();
      return;
    }
    this.presentARWorldAlert();
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

  OpenBrower() {

    const ARWorldURL = "https://eshop.cafilab.com/?id="+ GlobalComponent.fittingRoom[1].id + "&token=Bearer%20" + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIn0.UpBgrA-TbGG5mX6C_4G-gvxOCsnX06Z6yWSwKv_TLRk"//GlobalComponent.token; //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIn0.UpBgrA-TbGG5mX6C_4G-gvxOCsnX06Z6yWSwKv_TLRk" //GlobalComponent.token; //"Bearer%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdHJpbmcifQ.AGG0PPmzsmljcA0Y79jKhrreIAgJr071EJQq8Ngrm6k&lang=EN"
    const openSite = async () => {
      await Browser.open({url: ARWorldURL});
    };
    openSite();
  }


  remove_initial_item(){
    console.log("GlobalComponent.shoppingCart_F.length = " + GlobalComponent.shoppingCart_F.length);
    console.log("GlobalComponent.shoppingCart_M.length = " + GlobalComponent.shoppingCart_M.length);
    if(GlobalComponent.shoppingCart_F.length!=0) {
      if(GlobalComponent.shoppingCart_F.length[0] != undefined) {
        if (GlobalComponent.shoppingCart_F[0].name === 'initial_$#female') {
          GlobalComponent.shoppingCart_F.pop()
          this.shoppingCart_F_lens = 0;
          GlobalComponent.shoppingCart_F_lens = 0;
        }
        console.log("GlobalComponent.shoppingCart_F.length = " + GlobalComponent.shoppingCart_F.length);
      }
    }

    if(GlobalComponent.shoppingCart_M.length!=0) {
      if (GlobalComponent.shoppingCart_F.length[0] != undefined) {
        if (GlobalComponent.shoppingCart_M[0].name === 'initial_$#male') {
          GlobalComponent.shoppingCart_M.pop()
          this.shoppingCart_M_lens = 0;
          GlobalComponent.shoppingCart_M_lens = 0;
        }
        console.log("GlobalComponent.shoppingCart_M.length = " + GlobalComponent.shoppingCart_M.length);
      }
    }
  }


  protected readonly GlobalComponent = GlobalComponent;
}
