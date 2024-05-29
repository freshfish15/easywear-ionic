import { IconPage } from './../avatars/icon/icon.page';
import { UserService } from 'src/app/service/user.service';
import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {AlertController, IonFab, NavController, ToastController} from '@ionic/angular';
import {AvatarInfo, AvatarResponse, AvatarSuccessData, FailedData} from '../interface/AllResponse';
import {avatarResponse} from "../interface/avatarResponse";
import{routerModule} from "@angular/core/schematics/migrations/router-link-with-href/util";
import {Router} from "@angular/router";
import {AvatarDataService} from "./avatar-data.service";
import {GlobalComponent} from "../global-component";
import {AvatarCaptureComponent} from "../avatar/avatar-capture/avatar-capture.component";

@Component({
  selector: 'app-avatar-management',
  templateUrl: './avatar-management.page.html',
  styleUrls: ['./avatar-management.page.scss'],
})
export class AvatarManagementPage implements OnInit {
  viewMan: boolean;
  viewWoman: boolean;
  gender: boolean;
  viewCustomize: boolean
  avatarM: String;
  avatarF: String;
  avatarC: String;
  result: AvatarInfo[];
  numCols = 2;
  avatarIndex: number;
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
  ref!: ComponentRef<IconPage>

  constructor(
    private navController: NavController,
    private router: Router,
    private toastController: ToastController,
    private AvatarData: AvatarDataService,
    private alertController: AlertController,
    public userService: UserService) {
    this.viewMan = false;
    this.viewWoman = false;
    this.viewCustomize = true;
    this.avatarM = "/assets/svg/AvatarM.svg";
    this.avatarF = "/assets/svg/AvatarF.svg";
    this.avatarC = "/assets/svg/AvatarChoiceC.svg";
    this.onGetAvatar();
    //console.log(this.result.length);
  }

  ngOnInit() {
    console.log("NgOnInit...");
    if (this.result != undefined) {
      console.log(this.result);
    }
    this.updateAvatarList();
    // document.querySelector('ion-grid')?.style.setProperty('--ion-grid-columns', this.result.length.toString());
    document.querySelector('ion-grid')?.style.setProperty('--ion-grid-columns', this.numCols.toString());
  }

  updateAvatarList(){
    console.log("updating avatar list...");
    this.userService.getAvatar().subscribe((response: AvatarResponse) => {
      if(response.status == 'failed'){
        console.log(response.data.message);
      }

      this.result = response.data.avatar_list
      console.log("avatar_list: " + response.data.avatar_list[0]["name"])
      console.log("avatar_list_neck: " + response.data.avatar_list[0]["neck"])
    })
  }


  addChild() {
    this.ref = this.vcr.createComponent(IconPage);
    this.numCols++;
    console.log(this.numCols);
    if(this.numCols < 3){
      document.querySelector('ion-grid')?.style.setProperty('--ion-grid-columns', this.numCols.toString());
    } else {
    }
  }

  removeChild() {
    const index = this.vcr.indexOf(this.ref.hostView)
    if (index != -1) this.vcr.remove(index)
  }
  toggleMan(index: number) {
    this.avatarIndex = index;
    this.AvatarData.storeAvatarList(this.result[index])
    if (!this.viewMan) {
      if (this.viewWoman) {
        this.viewWoman = !this.viewWoman;
        this.avatarF = "/assets/svg/AvatarF.svg"
      }
      else if (this.viewCustomize) {
        this.viewCustomize = !this.viewCustomize;
        this.avatarC = "/assets/svg/AvatarC.svg"
      }
      this.avatarM = "/assets/svg/AvatarChoiceM.svg"
      this.viewMan = !this.viewMan;
    }
    this.presentToast('bottom');
    console.log("viewMan:" + this.viewMan +" " + this.viewWoman);
  }
  toggleWoman(index: number) {
    this.avatarIndex = index;
    this.AvatarData.storeAvatarList(this.result[index])
    if (!this.viewWoman) {
      if (this.viewCustomize) {
        this.viewCustomize = !this.viewCustomize;
        this.avatarC = "/assets/svg/AvatarC.svg"
      }
      else if (this.viewMan) {
        this.viewMan = !this.viewMan;
        this.avatarM = "/assets/svg/AvatarM.svg"
      }
      this.avatarF = "/assets/svg/AvatarChoiceF.svg"
      this.viewWoman = !this.viewWoman;
    }
    this.presentToast('bottom');
    console.log("viewMan:" + this.viewMan +" " + this.viewWoman);

  }
  toggleCustomize(index: number) {
    this.AvatarData.storeAvatarList(this.result[index])
    if (!this.viewCustomize) {
      if (this.viewWoman) {
        this.viewWoman = !this.viewWoman;
        this.avatarF = "/assets/svg/AvatarF.svg"
      }
      else if (this.viewMan) {
        this.viewMan = !this.viewMan;
        this.avatarM = "/assets/svg/AvatarM.svg"
      }
      this.avatarC = "/assets/svg/AvatarChoiceC.svg"
      this.viewCustomize = !this.viewCustomize;

    }
    this.presentToast('bottom');
  }


  detail() {
    if (this.viewMan || this.viewWoman) {
      return 'Avatar\'s details';
    } else {
      return 'default avatar\s details';
    }
  }

  whichDetail(): string {
    if (this.viewMan) {
      return 'man';
    } else if (this.viewWoman) {
      return 'woman';
    } else {
      return 'customize';
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Avatar Changed!',
      duration: 1000,
      position: position
    });

    await toast.present();
  }

  onGetAvatar() {
    this.userService.getAvatar().subscribe(
      (response: AvatarResponse) => {
        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to show failed message
          return;
        }
        let data = <AvatarSuccessData>response.data;
        data.avatar_list.forEach(
          a => {
            // TODO: How to use the data
          }
        )
        // response.status.forEach(s => {
        //     if (s.id != 0)this.result.push(s);
        // })
      },
      (e)=>{
        // error handle
      }
    )

  }

  navigateToAvatarDetail() {
    if(GlobalComponent.token == undefined){
      console.log("id is undfined!")
      this.presentLogInAlert();
      return;
    }


    if(this.whichDetail() === 'customize'){
      alert("Please select the avatar or create an avatar");
      return;
    }else this.router.navigate(['avatar-management/avatar-detail', this.whichDetail()])

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
            this.navController.navigateBack(['login']);
            // this.router.navigate(['login'])
            this.ionViewDidLeave();
            return;
          }
        }],
    });
    await alert.present();
  }

  ionViewDidLeave(){
    console.log("ionViewDidLeave() called");
  }

  RefreshAvList(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.updateAvatarList();
      event.target.complete();
    }, 2000);
  }



}
