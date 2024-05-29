import { EmailConfirmComponent } from './../../../modals/email-confirm/email-confirm.component';
import { GlobalComponent } from 'src/app/global-component';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import {AlertController, ModalController, NavController, SelectValueAccessor} from '@ionic/angular';
import * as $ from 'jquery';
import { parseJSON } from 'jquery';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FailedData, UserInfo4Upload, UserInfoResponse, UserInfoSuccessData } from 'src/app/interface/AllResponse';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  showPwdUp = false;
  showPwdDown = false;
  iconNameUp : string;
  iconNameDown : string;
  oauthService: any;
  nav: any;
  user : UserInfoResponse | undefined;
  checked : boolean;
  createSuccess : boolean;
  username : string = '';
  email : string = '';
  password : string = '';
  passwordConfirm : string = '';

  ionicForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private router : Router,
    private modalCtrl: ModalController,
    private userService : UserService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
  ) {
    this.iconNameUp = 'eye-off-outline';
    this.iconNameDown = 'eye-off-outline';
    this.checked = false;
    this.createSuccess = false;

    this.ionicForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ])),
      email: new FormControl('', ([
        Validators.required,
        Validators.email])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      passwordConfirm:  new FormControl ('', ([Validators.required])),
    });
    }

  createEvent(email : any){
    this.email = email;
    // this.email.Style();
    this.presentAlert();
  }
  togglePwdUp(){
    this.showPwdUp = !this.showPwdUp;

    if(this.showPwdUp){
      this.iconNameUp = 'eye-outline';
    } else {
      this.iconNameUp = 'eye-off-outline';
    }
  }

  togglePwdDown(){
    this.showPwdDown = !this.showPwdDown;

    if(this.showPwdDown){
      this.iconNameDown = 'eye-outline';
    } else {
      this.iconNameDown = 'eye-off-outline';
    }
  }

  async presentAlert() {
      const modal = await this.modalCtrl.create({
        component: EmailConfirmComponent,
        cssClass: 'ejectModal',
        componentProps: {},
      });
      modal.present();

      const {data, role} = await modal.onWillDismiss();
  }
  ngOnInit() {
    if(window.innerWidth > 700){
      document.getElementById("nameInput")?.style.setProperty('width', '75vw');
      document.getElementById("emailInput")?.style.setProperty('width', '75vw');
      document.getElementById("pwdInput")?.style.setProperty('width', '75vw');
      document.getElementById("pwdConfirmInput")?.style.setProperty('width', '75vw');

      document.getElementById("email")?.style.setProperty('left', '12vw');
      document.getElementById("pwd")?.style.setProperty('left', '12vw');
      document.getElementById("name")?.style.setProperty('left', '12vw');
      document.getElementById("pwdConfirm")?.style.setProperty('left', '12vw');
      document.getElementById('Up')?.style.setProperty('left', '80%');
      document.getElementById('Down')?.style.setProperty('left', '80%');
    }
    document.getElementById('create')?.setAttribute('disabled', 'true');
    document.getElementById("create")?.style.setProperty('opacity', '0.5');
  }
  check(){
    this.checked = !this.checked;
  }
  // checkValid(){
  //   this.checked = !this.checked;
  //   console.log(this.checked);

  //   if(this.username != '' && this.email != '' && this.password != '' &&
  //   this.passwordConfirm != '' && this.checked){
  //     if(this.password == this.passwordConfirm){
  //       document.getElementById('create')?.setAttribute('disabled', 'false');
  //       document.getElementById('create')?.style.setProperty('opacity', '1');
  //     }
  //   } else {
  //     document.getElementById('create')?.setAttribute('disabled', 'true');
  //     document.getElementById("create")?.style.setProperty('opacity', '0.5');
  //   }
  // }
  createAccount(){
    let userinfo : UserInfo4Upload={
      "nickname": this.username,
      "email": this.email,
      "password": this.password,
      "phone": "",
      "address": ""
    }
    GlobalComponent.regUserEmail = this.email;
    GlobalComponent.regUserName = this.username;
    GlobalComponent.regUserPwd = this.password;

    // let content = JSON.stringify(userinfo.toString());
    this.onPostUser(userinfo);
  };

  async openModal(){
    const modal = await this.modalCtrl.create({
      component : EmailConfirmComponent,
      cssClass : 'signin-modal',
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  onPostUser(content : UserInfo4Upload) : void{
    this.userService.regUser(content).subscribe(
      (response : UserInfoResponse) => {
        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to show the failed message?
          alert("Your username or email has been used. Please try another one.");
          console.log(data.message);
          return;
        }
        let data = <UserInfoSuccessData>response.data;
        this.createSuccess = true;
        this.openModal();
        // TODO: How to use the data?

        // Delete by SheYinxin 06/01/2023 start
        // console.log("post sent, here is the response:" + response.data);
        // if(response.status == 422){
        //   console.log("error 422");
        // }
        // this.createSuccess = true;
        // this.openModal();
        // Delete by SheYinxin 06/01/2023 end
      },
      (e : Error) => {
        // TODO: error handling


        // this.openModal();
      }
    );
  }

  checkLength() {
    if (this.password != undefined)
      if (this.password.length < 8)
        return false;
    return true;
  }

  checkMix() {
    var i = 0;
    var upperCase = false;
    var lowerCase = false;

    if (this.password != undefined && this.password != '')
      while (i <= this.password.length) {
        if (this.password.charCodeAt(i) >= 65 &&
          this.password.charCodeAt(i) <= 90) {
          upperCase = true;
        } else if (this.password.charCodeAt(i) >= 97 &&
          this.password.charCodeAt(i) <= 122) {
          lowerCase = true;
        }
        i++;
      }
    return upperCase && lowerCase;
  }

  checkNum() {
    var i = 0;
    var char = '';

    if (this.password != undefined)
      while (i <= this.password.length) {
        char = this.password.charAt(i);
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
    if (this.password != '' && this.passwordConfirm != '')
      return !(this.password === this.passwordConfirm);
    return false;
  }

  ableButton(){
    if(!this.checkSame() && this.checked &&
    this.checkLength() && this.checkMix() && this.checkNum() &&
    this.password != '' && this.passwordConfirm != '' && this.passwordConfirm != ''){
      document.getElementById("create")?.setAttribute("disabled", "false");
      document.getElementById("create")?.style.setProperty('opacity', '1');
    } else {
      document.getElementById("create")?.setAttribute("disabled", "true");
      document.getElementById("create")?.style.setProperty('opacity', '0.5');
    }
  }
  setError() {
    const input = document.getElementById("errorInput")?.style;
    const label = document.getElementById("errorItem")?.style;

    input?.setProperty('border-color', "#EA5820");
    input?.setProperty('border-width', "2px");

    label?.setProperty('color', "#EA5820");
  }

  setError2(){
    const input2 = document.getElementById("errorInput2")?.style;
    const label2 = document.getElementById("errorItem2")?.style;

    input2?.setProperty('border-color', "#EA5820");
    input2?.setProperty('border-width', "2px");

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
  goBack() {
    this.navCtrl.navigateBack(['login']);
  }
}
