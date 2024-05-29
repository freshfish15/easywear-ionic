import { ChangePasswordComponent } from './../../../../modals/change-password/change-password.component';
import { FuncService } from 'src/app/service/func.service';
import { pwdResponse } from './../../../../interface/pwdResponse';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import { AlertController, IonBackButtonDelegate, NavController, SelectValueAccessor, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NgIfContext } from '@angular/common';
import { OldPasswordResponse } from 'src/app/interface/AllResponse';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  showPwdUp = false;
  showPwdMiddle = false;
  showPwdDown = false;
  iconNameUp: string;
  iconNameMiddle: string;
  iconNameDown: string;

  ionicForm: FormGroup;

  currentPwd: string;
  newPwd: string;
  againPwd: string;
  pwdInitialized: boolean;

  successChanged : boolean;

  @ViewChild(IonBackButtonDelegate, { static: false })
  backButtonDelegate!: IonBackButtonDelegate;
  tickTemplate!: TemplateRef<NgIfContext<boolean>> | null;
  untickTemplate!: TemplateRef<NgIfContext<boolean>> | null;

  constructor(private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    public userService : UserService,
    public funcService : FuncService,
    public modalCtrl : ModalController) {
    this.iconNameUp = 'eye-off-outline';
    this.iconNameMiddle = 'eye-off-outline';
    this.iconNameDown = 'eye-off-outline';

    this.currentPwd = "";
    this.newPwd = "";
    this.againPwd = "";
    this.pwdInitialized = false;

    this.successChanged = false;

    this.ionicForm = new FormGroup({
      currentPwd: new FormControl(),
      newPwd: new FormControl(),
      againPwd: new FormControl(),
    });
  }

  ionViewDidEnter() {
    this.backButtonDelegate.onClick = async () => {
      await this.presentExitAlert();
    }
  };

  togglePwdUp() {
    this.showPwdUp = !this.showPwdUp;

    if (this.showPwdUp) {
      this.iconNameUp = 'eye-outline';
    } else {
      this.iconNameUp = 'eye-off-outline';
    }
  }
  togglePwdMiddle() {
    this.showPwdMiddle = !this.showPwdMiddle;

    if (this.showPwdMiddle) {
      this.iconNameMiddle = 'eye-outline';
    } else {
      this.iconNameMiddle = 'eye-off-outline';
    }
  }

  togglePwdDown() {
    this.showPwdDown = !this.showPwdDown;

    if (this.showPwdDown) {
      this.iconNameDown = 'eye-outline';
    } else {
      this.iconNameDown = 'eye-off-outline';
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordComponent,
      cssClass: 'custom-modal',
    });
    // modal.style.setProperty("--border-radius", '16px');
    // modal.style.setProperty("--box-shadow", '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)');
    modal.setAttribute('backdrop-dismiss', 'false');
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'SUCCESS!',
      cssClass: 'normal-alert',
      backdropDismiss: false,
      buttons: [{
        text: 'Done',
        handler: () => {
          this.router.navigateByUrl('/welcome/login');
        }
      }],
      message: `<img id="successImg" src="/assets/icon/Success.png/"></i>` +
        'You password has been changed successfully. Please login with your new password.',
    });
    await alert.present();
  }

  async presentExitAlert() {
    const alert4 = await this.alertController.create({
      header: 'Exit?',
      cssClass: 'normal-alert',
      message: "Are you sure you want to stop editing?",
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Exit',
        handler: () => {
          this.navCtrl.pop();
        }
      }],
    });
    await alert4.present();
  }

  checkLength() {
    if (this.newPwd != undefined)
      if (this.newPwd.length < 8)
        return false;
    return true;
  }

  checkMix() {
    var i = 0;
    var upperCase = false;
    var lowerCase = false;

    if (this.newPwd != undefined && this.newPwd != '')
      while (i <= this.newPwd.length) {
        if (this.newPwd.charCodeAt(i) >= 65 &&
          this.newPwd.charCodeAt(i) <= 90) {
          upperCase = true;
        } else if (this.newPwd.charCodeAt(i) >= 97 &&
          this.newPwd.charCodeAt(i) <= 122) {
          lowerCase = true;
        }
        i++;
      }
    return upperCase && lowerCase;
  }

  checkNum() {
    var i = 0;
    var char = '';

    if (this.newPwd != undefined)
      while (i <= this.newPwd.length) {
        char = this.newPwd.charAt(i);
        if (this.isNumber(char))
          return true;
        i++;
      }
    return false;
  }

  isNumber(str: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }
    if (str.trim() === '') {
      return false;
    }
    return !Number.isNaN(Number(str));
  }

  checkSame() {
    if (this.currentPwd != '' && this.newPwd != '')
      return this.currentPwd === this.newPwd;
    return false;

  }

  checkSame2() {
    if (this.newPwd != '' && this.againPwd != '')
      return !(this.newPwd === this.againPwd);
    return false;
  }
  ngOnInit() {
  }

  setError() {
    const input = document.getElementById("errorInput")?.style;
    const label = document.getElementById("errorItem")?.style;

    // input?.setProperty('border-color', "#EA5820");
    // input?.setProperty('border-width', "2px");

    label?.setProperty('color', "#EA5820");
  }

  setError2(){
    const input2 = document.getElementById("errorInput2")?.style;
    const label2 = document.getElementById("errorItem2")?.style;

    // input2?.setProperty('border-color', "#EA5820");
    // input2?.setProperty('border-width', "2px");

    label2?.setProperty('color', "#EA5820");
  }

  resetError() {
    const input = document.getElementById("errorInput")?.style;
    const label = document.getElementById("errorItem")?.style;

    input?.setProperty('border-width', "0");

    label?.setProperty('color', "#FFFFFF");
  }

  resetError2(){
    const input2 = document.getElementById("errorInput2")?.style;
    const label2 = document.getElementById("errorItem2")?.style;

    input2?.setProperty('border-width', "0");

    label2?.setProperty('color', "#FFFFFF");
  }

  ableButton(){
    if(!this.checkSame() && !this.checkSame2() &&
    this.checkLength() && this.checkMix() && this.checkNum() &&
    this.currentPwd != '' && this.newPwd != '' && this.againPwd != ''){
      document.getElementById("complete")?.setAttribute("disabled", "false");
      document.getElementById("complete")?.style.setProperty('opacity', '1');
    } else {
      document.getElementById("complete")?.setAttribute("disabled", "true");
      document.getElementById("complete")?.style.setProperty('opacity', '0.5');
    }
  }
  successChange() : boolean{
    console.log(this.successChanged);
    return this.successChanged;
  }
  onChangePwd(oldPwd : string, newPwd : string){
    this.openModal();
    this.userService.changePassword(oldPwd, newPwd).subscribe(
      (response : OldPasswordResponse) => {
        // TODO
        // if(response.status == 'Password entered incorrectly'){
        //   this.funcService.errorToast(response.status);
        // } else {
        //   this.successChanged = true;
        //   this.funcService.errorToast(response.status);
        // }
      },
      (e : Error) => {
        this.funcService.errorToast(e.message);
        // console.log('error occurs: ' + e.status);
      }
    )
  }

}
