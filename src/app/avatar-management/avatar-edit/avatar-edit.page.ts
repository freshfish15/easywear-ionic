import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PickerColumnOption, PickerController } from '@ionic/angular';
import { AvatarResponse, AvatarSuccessData, FailedData } from 'src/app/interface/AllResponse';

@Component({
  selector: 'app-avatar-edit',
  templateUrl: './avatar-edit.page.html',
  styleUrls: ['./avatar-edit.page.scss'],
})
export class AvatarEditPage implements OnInit {
  selectedCm: boolean;
  selectedInch: boolean;
  unit: string;
  unit2: string;
  dataSet: number[] = new Array();
  items = [
    // { id: 0, value: "Height: ", },
    // { id: 1, value: "Weight: ", },
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
    public userService : UserService) {
    this.selectedCm = false;
    this.selectedInch = true;
    this.unit = 'cm';
    this.unit2 = 'kg';
  }
  ngOnInit() {
    this.switchCm();
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
      mode: 'ios',
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
            }
            this.dataSet[id] = value.number.value;
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
      header: 'Delete Avatar?',
      cssClass: 'normal-alert',
      message: "Do you really want to delete your avatar? All data will be lost.",

      buttons: [{
        text: 'Delete',
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
}
