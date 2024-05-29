import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router } from '@angular/router';
import { AlertController, NavController, IonBackButtonDelegate, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';
import { GlobalComponent, } from 'src/app/global-component';
import { Network } from '@capacitor/network';
import { FuncService } from 'src/app/service/func.service';
import { singleResponse } from 'src/app/interface/singleResponse';
import { FailedData, SimpleResponse, UserInfoResponse, UserInfoSuccessData } from 'src/app/interface/AllResponse';
import { userInfo } from 'os';
@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.page.html',
  styleUrls: ['./manage-account.page.scss'],
})
export class ManageAccountPage implements OnInit {
  public swipeControl: boolean
  username: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  regin = GlobalComponent.regIn;
  constructor(
    private alertController: AlertController,
    private router: Router,
    private userService: UserService,
    private funcService: FuncService,

  ) {
    this.swipeControl = false;

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    })
    this.logCurrentNetworkStatus();
  }

  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();

    console.log('Network status:', status.connected);
    if (!status.connected) {
      this.funcService.networkErrorAlert();
    }
  };

  logOut() {
    this.presentLogOutAlert();
  }

  delete() {
    this.presentDeleteAlert();
  }

  async presentLogOutAlert() {
    const alert2 = await this.alertController.create({
      mode:'ios',
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
      mode:'ios',
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
  ngOnInit() {
    this.onGetUser();
  }
  onGetUser(): void {
    this.userService.getUser().subscribe(
      (response: UserInfoResponse) => {
        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to show the failed message?
          this.funcService.errorToast(data.message);
          return;
        }
        let data = <UserInfoSuccessData>response.data;
        this.username = data.user_info.nickname;
        this.email = data.user_info.email;
        this.phone = data.user_info.phone;
        this.address = data.user_info.address;
        // this.username = response.data.user.username;
        // this.email = response.data.user.email;
        // this.phone = response.data.user.phone;
        // this.address = response.data.user.address;
        // console.log(response.data.user.address);
      }
      ,(error : Error) => {
        // TODO: error handling
        this.funcService.networkErrorAlert();
      }
    );
  }
  onDeleteAccount() : boolean {
    let result = false;
    this.userService.deleteAccount().subscribe(
      (response : SimpleResponse) => {
        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to show the failed message?
          return;
        }
        // TODO: How to show the success message?
      }
      ,(e) => {
        // TODO: error handling
      }
      // (response : singleResponse) => {
      //   console.log('account removed!');
      //   result = true;
      // },
      // (error : singleResponse) => {
      //   console.log('remove error!');
      // }
    )
    this.router.navigate(['../../welcome']);
    return result;
  }


}

