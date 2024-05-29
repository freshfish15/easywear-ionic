import { GlobalComponent } from 'src/app/global-component';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import { AlertController, NavController, IonBackButtonDelegate, ToastController } from '@ionic/angular';
import { FuncService } from 'src/app/service/func.service';
import { singleResponse } from 'src/app/interface/singleResponse';
import { FailedData, SimpleResponse, UserInfo4Upload, UserInfoResponse, UserInfoSuccessData } from 'src/app/interface/AllResponse';
import { UserInfo } from 'src/app/interface/AllResponse';
import { error } from 'console';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  username: any;
  email: any;
  phone: any;
  address: any;
  @ViewChild(IonBackButtonDelegate, { static: false })
  backButtonDelegate !: IonBackButtonDelegate;

  constructor(private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private userService: UserService,
    private funcService: FuncService,
    private toastController : ToastController) {
  }

  ionViewDidEnter() {
    this.backButtonDelegate.onClick = async () => {
      await this.presentExitAlert();
    }
  };

  editEvent(email: any) {
    this.email = email;
    this.presentEmailAlert();
  }

  logOutAlert() {
    this.presentLogOutAlert();
  }

  deleteAlert() {
    this.presentDeleteAlert();
  }
  isValid(): boolean {
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+/;
    if (pattern.test(this.email)) {
      // this.onGenToken(this.email, this.password);
      return true;
    } else {
      return false;
    }
  }

  async presentEmailAlert() {
    const alert = await this.alertController.create({
      header: 'PLEASE VERIFY YOUR EMAIL',
      cssClass: 'custom-alert',
      buttons: [{
        text: 'Back to Log in',
        handler: () => {
          this.router.navigateByUrl('/welcome/login');
        }
      }],
      message: `<img id="emailImg" src="/assets/icon/email sent.png/"></i>` +
        'We have sent email to ' + this.email + ' to confirm the validity of email address.' +
        'After receiving the email follow the link provided to complete you registration.',
    });
    await alert.present();
  }
  async presentLogOutAlert() {
    const alert2 = await this.alertController.create({
      header: 'Log Out?',
      cssClass: 'normal-alert',
      message: "Are you sure you want to log out?",

      buttons: [{
        text: 'Log Out',
        handler: () => {
          GlobalComponent.token = '';
          GlobalComponent.tokenType = '';
          GlobalComponent.userid = NaN;
          GlobalComponent.regIn = '';
          GlobalComponent.logo = '';
          console.log('all data cleared ' + GlobalComponent.userid);
          this.router.navigateByUrl('/welcome/login');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
      }],
    });
    await alert2.present();
  }

  async presentDeleteAlert() {
    const alert3 = await this.alertController.create({
      header: 'Delete account?',
      cssClass: 'normal-alert',
      message: "All data associated with this account will be permanently deleted.",

      buttons: [{
        text: 'Delete',
        handler: () => {
          if(this.onDeleteAccount()){
            GlobalComponent.token = '';
            GlobalComponent.tokenType = '';
            GlobalComponent.userid = NaN;
            GlobalComponent.regIn = '';
            GlobalComponent.logo = '';
            console.log('all data cleared ' + GlobalComponent.userid);
            this.router.navigateByUrl('/welcome/login');
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
      }],
    });
    await alert3.present();
  }

  async presentExitAlert() {
    const alert4 = await this.alertController.create({
      header: 'Exit?',
      cssClass: 'normal-alert',
      message: "Are you sure you want to stop editing?",
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

  ngOnInit() {
    if (window.innerWidth > 700) {
      document.getElementById("emailInput")?.style.setProperty('width', '75vw');
      document.getElementById("nameInput")?.style.setProperty('width', '75vw');
      document.getElementById("addressInput")?.style.setProperty('width', '75vw');
      document.getElementById("phoneInput")?.style.setProperty('width', '75vw');

      document.getElementById("email")?.style.setProperty('left', '12vw');
      document.getElementById("name")?.style.setProperty('left', '12vw');
      document.getElementById('address')?.style.setProperty('left', '12vw');
      document.getElementById('phone')?.style.setProperty('left', '12vw');
    }
  }

  changeInfo() {
    if (this.isValid()) {
      let userInfo: UserInfo4Upload = {
        "user_id": GlobalComponent.userid,
        "email": '',
        "nickname": '',
        "phone": '',
        "address": '',
      }
      if (this.username != '')
        userInfo.nickname = this.username;
      if (this.email != '')
        userInfo.email = this.email;
      if (this.phone != '')
        userInfo.phone = this.phone;
      if (this.address != '')
        userInfo.address = this.address;
      let s = new URLSearchParams(Object.entries(userInfo)).toString();
      this.onChangeInfo(s);
    } else {
      this.invalidEmail();
    }
  }
  async invalidEmail() {
    const toast = await this.toastController.create({
      message: 'Invalid Email!!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
  onChangeInfo(content: string) {
    this.userService.changeInfo(content).subscribe(
      (response: UserInfoResponse) => {
        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to use the failed message?
          console.log(data.message);
          return;
        }
        let data = <UserInfoSuccessData>response.data;
        // TODO: How to use the data?

        // console.log("post sent, here is the response:" + response.data);
        // if (response.status == 422) {
        //   console.log("error 422");
        // }
      },
      (e: Error)=> {
        // TODO : error handling
      }
    )
  }

  onDeleteAccount() : boolean {
    let result = false;
    this.userService.deleteAccount().subscribe(
      // TODO
      (response : SimpleResponse) => {
        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to show the failed message?
          return;
        }
        // TODO: How to show the success message?
      },
      (e)=> {
        // TODO : error handling
      }
      // (response : singleResponse) => {
      //   console.log('account removed!');
      //   result = true;
      // },
      // (error : singleResponse) => {
      //   console.log('remove error!');
      // }
    )
    return result;
  }

}
