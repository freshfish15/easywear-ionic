import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, PickerColumnOption, PickerController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {
  AvatarCaptureBodyScanningComponent
} from "../avatar-capture-camera-body/avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import {
  AvatarCaptureEnteringDataGuideComponent
} from "./avatar-capture-entering-data-guide/avatar-capture-entering-data-guide.component";
import {AvatarResponse, AvatarSuccessData, FailedData, MeasureInfo4Upload} from '../interface/AllResponse';
import {catchError} from "rxjs/operators";
import {generate, of} from "rxjs";
import {GlobalComponent} from "../global-component";

@Component({
  selector: 'app-avatar-capture-entering-data',
  templateUrl: './avatar-capture-entering-data.page.html',
  styleUrls: ['./avatar-capture-entering-data.page.scss'],
})
export class AvatarCaptureEnteringDataPage implements OnInit {

  flag: boolean = true;  //whether any measurement value is empty
  selectedCm: boolean;
  selectedInch: boolean;
  unit: string;
  gender: string;
  unit2: string;
  dataSet: number[] = new Array();
  items = [
    // { id: 0, value: "Height: ", },
    // { id: 1, value: "Weight: ", },
    { id: 0, value: "Neck: ", },
    { id: 1, value: "Shoulder: ", },
    { id: 2, value: "Chest: ", },
    { id: 3, value: "Bust: ", },
    { id: 4, value: "Waist: ", },
    { id: 5, value: "Upper arm: ", },
    { id: 6, value: "Sleeve: ", },
    { id: 7, value: "Hips: ", },
    { id: 8, value: "Out seam: ", },
    { id: 9, value: "Thigh: ", },
    { id: 10, value: "Calf: ", }
  ];

  constructor(private pickerCtrl: PickerController,
              private alertController: AlertController,
              private router: Router,
              private modalCtrl: ModalController,
              public userService : UserService) {
    this.selectedCm = false;
    this.selectedInch = true;
    this.unit = 'cm';
    this.unit2 = 'kg';
  }
  ngOnInit() {
    this.switchCm();
  }
  ngAfterViewInit() {
    this.openGuide();
  }

  async openGuide() {
    const modal = await this.modalCtrl.create({
      component: AvatarCaptureEnteringDataGuideComponent,
      cssClass: 'customModalSettingFull',
      componentProps: {},
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

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
  getWeight(type: string) {
    var optionsArray: PickerColumnOption[];
    optionsArray= new Array();
    if (type == 'Weight') {
      optionsArray = [
        {
          text: 'kg',
          value: 'kg',
        },
        {
          text: 'lbs',
          value: 'lbs',
        },
      ]
    } else if (type == 'Height'){
      optionsArray = [
        {
          text: 'cm',
          value: 'cm',
        },
        {
          text: 'inch',
          value: 'inch',
        },
      ]
    }

    return optionsArray;

  }
  async openPicker(id: number) {
    var height;
    var weight;
    if (id == 0) {
      height = this.getHeight(30, 100);
      weight = this.getWeight('Height');
    } else if (id == 1) {
      height = this.getHeight(30, 100);
      weight = this.getWeight('Weight');
    } else {
      height = this.getHeight(0, 100);
      weight = this.getWeight('Height');
    }
    const picker = await this.pickerCtrl.create({
      cssClass: 'myPicker',
      columns: [
        {
          name: 'number',
          options: height,
        },
        {
          name: 'unit',
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
            // if(id == 1){
            //   this.unit2 = value.unit.value;
            // } else {
            //   this.unit = value.unit.value;
            // }
            this.dataSet[id] = value.number.value;
            console.log(this.items[id].value + ": " + this.dataSet[id]);
          },
        },
      ],
    });
    await picker.present();
  }

  switchCm() {
    if (!this.selectedCm) {
      document.getElementById('cm')?.style.setProperty(
        "background", "rgba(108, 106, 235, 0.2)");
      document.getElementById('cm')?.style.setProperty(
        "border", " 2px solid #6C6AEB");
      document.getElementById('cm')?.style.setProperty(
        "color", "#6C6AEB");
      document.getElementById('inch')?.style.setProperty(
        "background", "rgba(255, 255, 255, 0.2)");
      document.getElementById('inch')?.style.setProperty(
        "border", "1px solid #FFFFFF");
      document.getElementById('inch')?.style.setProperty(
        "color", "#FFFFFF");
      this.selectedCm = !this.selectedCm;
      this.selectedInch = !this.selectedInch;
      this.unit = 'cm';
      this.unit2 = 'kg';
    }
  }
  switchInch() {
    if (!this.selectedInch) {
      document.getElementById('inch')?.style.setProperty(
        "background", "rgba(108, 106, 235, 0.2)");
      document.getElementById('inch')?.style.setProperty(
        "border", " 2px solid #6C6AEB");
      document.getElementById('inch')?.style.setProperty(
        "color", "#6C6AEB");
      document.getElementById('cm')?.style.setProperty(
        "background", "rgba(255, 255, 255, 0.2)");
      document.getElementById('cm')?.style.setProperty(
        "border", "1px solid #FFFFFF");
      document.getElementById('cm')?.style.setProperty(
        "color", "#FFFFFF");
      this.selectedCm = !this.selectedCm;
      this.selectedInch = !this.selectedInch;
      this.unit = 'inch';
      this.unit2 = 'lbs';
    }
  }

  deleteAlert() {
    this.presentDeleteAlert();
  }
  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Leave?',
      cssClass: 'normal-alert',
      message: "All of the body measurement data will be lost.",

      buttons: [{
        text: 'Leave',
        handler: () => {
        }
      },
        {
          text: 'Cancel',
          role: 'cancel',
        }],
    });
    await alert.present();
  }

  saveAlert() {
    this.presentSaveAlert();
  }
  async presentSaveAlert() {
    const alert = await this.alertController.create({
      header: 'Save changes?',
      cssClass: 'normal-alert',
      message: "Your avatar's body measurement wll be changed.",

      buttons: [{
        text: 'Save',
        handler: () => {
        }
      },
        {
          text: 'Cancel',
          role: 'cancel',
        }],
    });
    await alert.present();
  }

  onGetAvatarDetail(){
    this.userService.getAvatar().subscribe(
      (response : AvatarResponse) => {
        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to show failed message
          return;
        }
        let data = <AvatarSuccessData>response.data;
        // TODO: How to use data

      },
      (e)=>{
        // TODO: error handling
      }
    )
  }

  checkEmpty(){
    for(let i=0; i<11; i++){
      if(this.dataSet[i] == undefined)
      return false;
    }
    return true;
  }

  onPostMeasureData(){

    if (localStorage.getItem('isFemale').toUpperCase() === 'FALSE') {
      this.gender = 'm';
    } else {
      this.gender = 'f';
    }

    if(this.checkEmpty()) {

      if (this.flag == false) return;

      let sizes = {
        "Chest": this.dataSet[2],
        "Waist": this.dataSet[4],
        "Hips": this.dataSet[7],
        "Shoulder": this.dataSet[1],
        "Bust": this.dataSet[3],
        "Neck": this.dataSet[0],
        "UpperArm": this.dataSet[5],
        "Sleeve": this.dataSet[6],
        "Thigh": this.dataSet[9],
        "Calf": this.dataSet[10],
        "OutSeam": this.dataSet[8]
      }

      let measureInfo: MeasureInfo4Upload = {
        "user_email": GlobalComponent.signinEmail,
        "measureName": localStorage.getItem("AvatarName"),
        "measureType": 0,
        "height": Number(localStorage.getItem('height')),
        "weight": Number(localStorage.getItem('weight')),
        "frontpic": "",
        "sidepic": "",
        "sizes": JSON.stringify(sizes),
        "gender": this.gender
      }

      this.userService.uploadMeasurement(measureInfo).pipe(
        catchError((error) => {
          alert("Error Occurred when sending measure data to EasyWear server. Please try again.")
          throw error
          return of({data: {}, msg: error.statusText});
        })
      )
        .subscribe(response => {
          console.log(response.data)
          alert("Your measurement data has been uploaded successfully")
          this.navigateToAvatarPage();
        })

    }else{
      alert("Not all measure items are filled");
    }
    this.navigateToAvatarPage();
  }

  navigateToAvatarPage() {
    this.router.navigate(['/avatar']);
  }

}
