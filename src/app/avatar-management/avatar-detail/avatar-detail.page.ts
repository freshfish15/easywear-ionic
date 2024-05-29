import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {AvatarInfo} from "../../interface/AllResponse";
import {AvatarDataService} from "../avatar-data.service";

@Component({
  selector: 'app-avatar-detail',
  templateUrl: './avatar-detail.page.html',
  styleUrls: ['./avatar-detail.page.scss'],
})
export class AvatarDetailPage implements OnInit {
  selectedCm: boolean;
  unitHeight = "CM";
  unitWeight = "KG";
  cmToInch: number = 0.394;
  kgToLbs: number = 2.205;
  selectedInch: boolean;
  avatarName: string;
  height: number;
  heightInch: number;
  weight: number;
  weightLbs: number;
  avatarList: AvatarInfo;
  type: string;
  custom: boolean;
  expanded : boolean;
  items = [
    { id: 0, value: "Neck: ", number: 0},
    { id: 1, value: "Shoulder: ", number: 0},
    { id: 2, value: "Chest: ", number: 0},
    { id: 3, value: "Bust: ", number: 0},
    { id: 4, value: "Waist: ", number: 0},
    { id: 5, value: "Upper arm: ", number: 0},
    { id: 6, value: "Sleeve: ", number: 0},
    { id: 7, value: "Hips: ", number: 0},
    { id: 8, value: "Out seam: ", number: 0},
    { id: 9, value: "Thigh: ", number: 0},
    { id: 10, value: "Calf: ", number: 0}
  ];

  itemsInchLbs = [
    { id: 0, value: "Neck: ", number: 0},
    { id: 1, value: "Shoulder: ", number: 0},
    { id: 2, value: "Chest: ", number: 0},
    { id: 3, value: "Bust: ", number: 0},
    { id: 4, value: "Waist: ", number: 0},
    { id: 5, value: "Upper arm: ", number: 0},
    { id: 6, value: "Sleeve: ", number: 0},
    { id: 7, value: "Hips: ", number: 0},
    { id: 8, value: "Out seam: ", number: 0},
    { id: 9, value: "Thigh: ", number: 0},
    { id: 10, value: "Calf: ", number: 0}
  ]

  tempItem = [];

  constructor(public route: ActivatedRoute,
    private alertController: AlertController,
    public AvatarData: AvatarDataService,
    private router: Router,) {
    this.type = this.route.snapshot.params['type'];
    this.selectedCm = false;
    this.selectedInch = true;
    this.expanded = false;

    // if (this.type == 'man') {
    //   this.height = 175;
    //   this.weight = 65;
    //   this.custom = false;
    // } else if (this.type == 'woman') {
    //   this.height = 160;
    //   this.weight = 48;
    //   this.custom = false;
    // } else {
    //   this.height = 160;
    //   this.weight = 48;
    //   this.custom = true;
    // }

  }

  ngOnInit() {
    this.avatarList = this.AvatarData.getAvatarList()
    this.setItemValueNumber();
    this.switchCm();
  }

  setItemValueNumber(){
    this.items[0].number = this.avatarList.neck;
    this.items[1].number = this.avatarList.shoulder;
    this.items[2].number = this.avatarList.chest;
    this.items[3].number = this.avatarList.bust;
    this.items[4].number = this.avatarList.waist;
    this.items[5].number = this.avatarList.upperarm;
    this.items[6].number = this.avatarList.sleeve;
    this.items[7].number = this.avatarList.hips;
    this.items[8].number = this.avatarList.outseam;
    this.items[9].number = this.avatarList.thigh;
    this.items[10].number = this.avatarList.calf;
    this.avatarName = this.avatarList.name;
    this.height = this.avatarList.height;
    this.weight = this.avatarList.weight;
    this.itemsInchLbs[0].number = Number((this.avatarList.neck * this.cmToInch).toFixed(2));
    this.itemsInchLbs[1].number = Number((this.avatarList.shoulder * this.cmToInch).toFixed(2));
    this.itemsInchLbs[2].number = Number((this.avatarList.chest * this.cmToInch).toFixed(2));
    this.itemsInchLbs[3].number = Number((this.avatarList.bust * this.cmToInch).toFixed(2));
    this.itemsInchLbs[4].number = Number((this.avatarList.waist * this.cmToInch).toFixed(2));
    this.itemsInchLbs[5].number = Number((this.avatarList.upperarm * this.cmToInch).toFixed(2));
    this.itemsInchLbs[6].number = Number((this.avatarList.sleeve * this.cmToInch).toFixed(2));
    this.itemsInchLbs[7].number = Number((this.avatarList.hips * this.cmToInch).toFixed(2));
    this.itemsInchLbs[8].number = Number((this.avatarList.outseam * this.cmToInch).toFixed(2));
    this.itemsInchLbs[9].number = Number((this.avatarList.thigh * this.cmToInch).toFixed(2));
    this.itemsInchLbs[10].number = Number((this.avatarList.calf * this.cmToInch).toFixed(2));
    this.heightInch = Number((this.avatarList.height * this.cmToInch).toFixed(2));
    this.weightLbs = Number((this.avatarList.weight * this. kgToLbs).toFixed(2));
  }

  prefix(){
    if(this.type == 'man'){
      return 'male';
    } else {
      return 'female';
    }
  }
  switchCm() {
    this.tempItem = this.items;
    this.items = this.itemsInchLbs;
    this.itemsInchLbs = this.tempItem;
    this.unitHeight = "CM";
    this.unitWeight = "KG"
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
    }
  }
  switchInch() {
    this.tempItem = this.items;
    this.items = this.itemsInchLbs;
    this.itemsInchLbs = this.tempItem;
    this.unitHeight = "Inch";
    this.unitWeight = "lbs"
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
    }
  }

  whichType() {
    if (this.type == 'man') {
      return '/assets/icon/FullML.png'
    } else if (this.type == 'woman') {
      return '/assets/icon/FullFL.png'
    } else {
      return '/assets/icon/FullCL.png'
    }
  }

  resetSize() {

  }
  returnHeight() {
    if (this.selectedCm) {
      return this.height + 'cm';
    } else {
      return this.height + 'inch';
    }
  }
  returnWeight() {
    if (this.selectedInch) {
      return this.weight + 'lbs';
    } else {
      return this.weight + 'kg';
    }
  }

  exportAlert() {
    this.presentExportAlert();
  }
  async presentExportAlert() {
    const alert = await this.alertController.create({
      header: 'Export Data?',
      cssClass: 'normal-alert',
      message: "Are you sure that you want to export the body measurement data? This may take a few moments.",

      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },{
        text: 'Export',
        handler: () => {
        }
      }],
    });
    await alert.present();
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
}
