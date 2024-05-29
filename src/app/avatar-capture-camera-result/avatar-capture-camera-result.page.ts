import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, PickerColumnOption, PickerController} from "@ionic/angular";
import {Router, NavigationExtras} from "@angular/router";
import {UserService} from "../service/user.service";
import {
  AvatarCaptureBodyScanningComponent
} from "../avatar-capture-camera-body/avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import {
  AvatarCaptureEnteringDataGuideComponent
} from "../avatar-capture-entering-data/avatar-capture-entering-data-guide/avatar-capture-entering-data-guide.component";
import { AvatarResponse, AvatarSuccessData, FailedData } from '../interface/AllResponse';
import { ActivatedRoute } from '@angular/router';
import {EmtailorDataService} from '../emtailor/emtailor-data.service'
import {EmtailorService} from "../emtailor/emtailor.service";
@Component({
  selector: 'app-avatar-capture-camera-result',
  templateUrl: './avatar-capture-camera-result.page.html',
  styleUrls: ['./avatar-capture-camera-result.page.scss'],
})
export class AvatarCaptureCameraResultPage implements OnInit {


  selectedCm: boolean;
  selectedInch: boolean;
  unit: string;
  unit2: string;
  dataSet: number[] = new Array();
  items = [
    { id: 0, value: "Height: ", },
    { id: 1, value: "Weight: ", },
    { id: 2, value: "Neck: ", },
    { id: 3, value: "Shoulder: ", },
    { id: 4, value: "Chest: ", },
    { id: 5, value: "Bust: ", },
    { id: 6, value: "Waist: ", },
    { id: 7, value: "Upper arm: ", },
    { id: 8, value: "Sleeve: ", },
    { id: 9, value: "Hips: ", },
    { id: 10, value: "Out seam: ", },
    { id: 11, value: "Thigh: ", },
    { id: 12, value: "Calf: ", }
  ];

  constructor(private pickerCtrl: PickerController,
              private alertController: AlertController,
              private router: Router,
              private route: ActivatedRoute,
              private modalCtrl: ModalController,
              public userService : UserService,
              public emtailorDataService: EmtailorDataService) {
    this.selectedCm = false;
    this.selectedInch = true;
    this.unit = 'cm';
    this.unit2 = 'kg';
  }
  ngOnInit() {
    //const dataFromPreviousPage = this.route.snapshot.paramMap.get('navigationExtras');
    const sizeDataObject = this.emtailorDataService.sizeObject;
    // Use the data as needed
    console.log("sizeDataObject: " + sizeDataObject);
    //console.log("dataFromPreviousPage: " + dataFromPreviousPage);
    this.dataSet[0] = +localStorage.getItem('height')  //this.getHeight(140, 200);
    this.dataSet[1] = +localStorage.getItem('weight') //this.getWeight('Height');
    this.switchCm();
    this.setValueFromService(sizeDataObject);
  }
  ngAfterViewInit() {
    this.openGuide();
  }

  setValueFromService(sizeObject: Array<{ sizeCode: string; sizeCmVal: number }>){
    if(sizeObject != undefined){

      this.dataSet[2] = sizeObject.find((size) => size.sizeCode === 'fsize04_020').sizeCmVal;
      this.dataSet[3] = sizeObject.find((size) => size.sizeCode === 'fsize03_010').sizeCmVal;
      this.dataSet[4] = sizeObject.find((size) => size.sizeCode === 'fsize01_025').sizeCmVal;
      this.dataSet[5] = sizeObject.find((size) => size.sizeCode === 'fsize03_021').sizeCmVal;
      this.dataSet[6] = sizeObject.find((size) => size.sizeCode === 'fsize01_030').sizeCmVal;
      this.dataSet[7] = sizeObject.find((size) => size.sizeCode === 'fsize07_010').sizeCmVal;
      this.dataSet[8] = sizeObject.find((size) => size.sizeCode === 'fsize07_030').sizeCmVal;
      this.dataSet[9] = sizeObject.find((size) => size.sizeCode === 'fsize01_040').sizeCmVal;
      this.dataSet[10] = sizeObject.find((size) => size.sizeCode === 'fsize11_030').sizeCmVal;
      this.dataSet[11] = sizeObject.find((size) => size.sizeCode === 'fsize09_010').sizeCmVal;
      this.dataSet[12] = sizeObject.find((size) => size.sizeCode === 'fsize09_030').sizeCmVal;

    }else{
      alert("Error occurred while setting value from the server");
    }


    console.log("value set: " + this.dataSet[2]);
    //value.number.value;

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
      height = this.getHeight(140, 200);
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
            if(id == 1){
              this.unit2 = value.unit.value;
            } else {
              this.unit = value.unit.value;
              this.dataSet[id] = value.number.value;
              console.log(this.items[id].value + "id : " + this.dataSet[id])
            }

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
          this.navigateToAvatarPage();
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

  navigateToAvatarPage() {
    this.router.navigate(['/avatar']);
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

}
