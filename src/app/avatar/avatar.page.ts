import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController, NavController, PickerColumnOption, PickerController} from "@ionic/angular";
import {AvatarCaptureComponent} from "./avatar-capture/avatar-capture.component";
import {
  AvatarCaptureFaceScanningComponent
} from "../avatar-capture-camera-face/avatar-capture-face-scanning/avatar-capture-face-scanning.component";
import {AvatarCaptureBodyScanningComponent} from "../avatar-capture-camera-body/avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import {
  AvatarCaptureEnteringDataComponent
} from "./avatar-capture-entering-data/avatar-capture-entering-data.component";
import {toLower} from "ionicons/dist/types/components/icon/utils";
import {GlobalComponent} from "../global-component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.page.html',
  styleUrls: ['./avatar.page.scss'],
})
export class AvatarPage implements OnInit {
  AvatarName: string ='';

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000
    }
  };

  avatarHeight:any;
  avatarWeight:any;
  constructor(private modalCtrl: ModalController,
              private navController: NavController,
              private pickerCtrl: PickerController,
              private alertController: AlertController,
              private router: Router,) {
  }

  async openHeightPicker() {
    var height;
    height = this.getHeight(140, 200);
    const picker = await this.pickerCtrl.create({
      cssClass: 'myPicker',
      mode: 'ios',
      columns: [
        {
          name: 'height',
          options: height,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.avatarHeight = value.height.value;  //+ " cm";
            localStorage.setItem('height', this.avatarHeight);
            console.log("Avatar Height: " + this.avatarHeight);
          },
        },
      ],
    });

    await picker.present();
}

  getHeight(lowerBound: number, upperBound: number) {
    var optionsArray: PickerColumnOption[];
    optionsArray = new Array();
    var j = 0;
    for (var i: number = lowerBound; i <= upperBound; i++) {
      optionsArray[j++] = {
        text: i.toString(),
        value: i,
      }
    }
    return optionsArray;
  }

  getWeight(lowerBound: number, upperBound: number) {
    var optionsArray: PickerColumnOption[];
    optionsArray = new Array();
    var j = 0;
    for (var i: number = lowerBound; i <= upperBound; i++) {
      optionsArray[j++] = {
        text: i.toString(),
        value: i,
      }
    }
    return optionsArray;
  }
  async openWeightPicker() {
    var weight;
    weight = this.getWeight(20, 150);
    const picker = await this.pickerCtrl.create({
      cssClass: 'myPicker',
      mode: 'ios',
      columns: [
        {
          name: 'weight',
          options: weight,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.avatarWeight = value.weight.value; // + " kg";
            localStorage.setItem('weight', this.avatarWeight);
            console.log("Avatar weight: " + this.avatarWeight);
          },
        },
      ],
    });

    await picker.present();
  }

  isFemale = false;

  avatarM(){
    this.isFemale = false;
    localStorage.setItem("isFemale", "false" );
    console.log("Sex isFemale: " + localStorage.getItem("isFemale"));
  }
  avatarF(){
    this.isFemale = true;
    localStorage.setItem("isFemale", "true" );
    console.log("Sex isFemale: " + localStorage.getItem("isFemale"));
  }
  async openEnteringData() {
    if(GlobalComponent.token == undefined){
      console.log("token is undfined!")
      this.presentLogInAlert();
      return;
    }


    const modal = await this.modalCtrl.create({
      component: AvatarCaptureEnteringDataComponent,
      cssClass: 'customModalSetting',
      componentProps: {},
    });
    console.log(this.AvatarName + " " + this.avatarWeight + " " + this.avatarHeight)
    if(this.AvatarName === '' || this.avatarWeight === undefined || this.avatarHeight === undefined){
      alert("Please input avatar information");
      return;
    }
    this.getAvatarName()
    modal.present();

    const {data, role} = await modal.onWillDismiss();
    this.router.navigate(['avatar-capture-entering-data'])
  }

  async openFaceScanning() {


    if(GlobalComponent.token == undefined){
      console.log("id is undfined!")
      this.presentLogInAlert();
      return;
    }
    if(this.AvatarName === '' || this.avatarWeight === undefined || this.avatarHeight === undefined){
      alert("Please input avatar information");
      return;
    }
    this.getAvatarName();
    const modal = await this.modalCtrl.create({
      component: AvatarCaptureComponent,
      cssClass: 'customModalSetting',
      componentProps: {},
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    this.router.navigate(['avatar-capture-camera-face'])

  }


  getAvatarName(){
    const inputValue = this.AvatarName;
    console.log('Avatar Name: ' + inputValue);
    localStorage.setItem('AvatarName', inputValue);
  }


  ngOnInit() {
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
