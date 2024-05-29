import { EmailConfirmComponent } from './../../../modals/email-confirm/email-confirm.component';
import { singleResponse } from 'src/app/interface/singleResponse';
import { FuncService } from 'src/app/service/func.service';
import { signinResponse } from './../../../interface/signinResponse';
import { signinUser } from './../../../interface/signinUser';
import {HttpClient, HttpResponse, HttpRequest, HttpStatusCode, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, SelectValueAccessor, ToastController, ModalController,NavController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';
import { GlobalComponent } from 'src/app/global-component';
import { Toast } from '@capacitor/toast';
import { esingleResponse } from 'src/app/interface/esingleResponse';
import { SigninComponent } from 'src/app/modals/signin/signin.component';
import {
  FailedData,
  UserInfoResponse,
  UserInfoSuccessData,
  TokenResponse,
  TokenSuccessData,
  emailVeriResponse,
  EmailVeriSucessData
} from 'src/app/interface/AllResponse';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {code} from "ionicons/icons";
import {pipe, catchError, throwError, config} from "rxjs";
import * as url from "url";
import {error} from "console";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  showPwd = false;
  email: string = '';
  password: string = '';
  iconName: string;
  filled: boolean;
  isVerified: boolean;
  networkStatus: number = NaN;

  constructor(
    private alertController: AlertController,
    public httpClient: HttpClient,
    private userService: UserService,
    private toastController: ToastController,
    private funcService: FuncService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private router : Router,
  ) {
    this.isVerified = false;
    this.iconName = 'eye-off-outline';
    this.filled = false;

    this.SignInForm = new FormGroup({
      email: new FormControl('', ([
        Validators.required,
        Validators.email,
        Validators.minLength(5),])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
  }

  SignInForm: FormGroup;

  checkFill() {
    if (this.email != '' && this.password != '') {
      if (this.email.length != 0 && this.password.length != 0) {
        this.filled = true;
        document.getElementById('signinButton')?.setAttribute('disabled', 'false');
        document.getElementById('signinButton')?.style.setProperty('opacity', '0.9');
      }
    } else {
      this.filled = false;
      document.getElementById('signinButton')?.setAttribute('disabled', 'true');
      document.getElementById('signinButton')?.style.setProperty('opacity', '0.5');
    }
  }
  togglePwd() {
    this.showPwd = !this.showPwd;

    if (this.showPwd) {
      this.iconName = 'eye-outline';
    } else {
      this.iconName = 'eye-off-outline';
    }
  }

  signinAlert() {
    this.googleSigninAlert();
  }

  presentAlert() {
    const showHelloToast = async () => {
      await Toast.show({
        text: 'Hello!',
      });
    };
  }
  async invalidEmail() {
    const toast = await this.toastController.create({
      message: 'Invalid Email!!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  //not verified email
  async presentEmailNotVerifiedAlert(){
    const modal = await this.modalCtrl.create({
      component: SigninComponent,
      cssClass: 'ejectModal',
      componentProps: {},
    });
    modal.present();

  }





  async googleSigninAlert() {
    const alert = await this.alertController.create({
      header: `Easywear would like to use "google.com" to sign in.`,
      cssClass: 'normal-alert',
      mode:"ios",
      message:
        'This allows the app and website to share information about you.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Continue',
          handler: () => { },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    if (window.innerWidth > 700) {
      document.getElementById('emailInput')?.style.setProperty('width', '75vw');
      document.getElementById('pwdInput')?.style.setProperty('width', '75vw');
      document.getElementById('email')?.style.setProperty('left', '12vw');
      document.getElementById('pwd')?.style.setProperty('left', '12vw');
      document.getElementById('hide')?.style.setProperty('left', '80%');
    }
  }

  signin() {
    if (this.isValid()) {
      //test
      //alert("if(isValid()");
      GlobalComponent.signinEmail = this.email;
      let user: signinUser = {
        grant_type: '',
        username: this.email,
        password: this.password,
        scope: '',
        client_id: '',
        client_secret: '',
      };

      let s = new URLSearchParams(Object.entries(user)).toString();
      this.onGenToken(s);
      //this.checkIfVerified(user.username);

      //alert("Verification2: " + GlobalComponent.EmailVerification);
      /*alert("Verification1: " +this.userService.checkEmailVerification("20076546d@connect.polyu.hk").subscribe((response: emailVeriResponse) => {
        return response.message;
      }))*/

      //alert("Verification: " + this.checkifverified("20076546d@connect.polyu.hk"));
      //alert("Network status: " + this.networkStatus); //network status are always NaN


      if (Number.isNaN(this.networkStatus)) {
        console.log('called');



        return;
      } else if (this.networkStatus == 404) {
        console.log('called');
        //Alert wrong passwords
        alert("Incorrect Email or Password");
        return;
      }

      //this.router.navigate(['eshop']);

    } else {
      this.invalidEmail();
      return;
    }
      /*
      if (Number.isNaN(this.networkStatus)) {
        console.log('called');

        alert("Incorrect Email or Password");

        return;
      } else if (this.networkStatus == 404) {
        console.log('called');
        //Alert wrong password
        alert("Incorrect Email or Password");
        return;
      }
      this.router.navigate(['eshop']);

    } else {
      this.invalidEmail();
      return;
    } */

    //this.router.navigate(['eshop']);

  }

  isValid(): boolean {
    // return true;
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+/;
    if (pattern.test(this.email)) {
      // this.onGenToken(this.email, this.password);
      return true;
    } else {
      return false;
    }
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SigninComponent,
      cssClass: 'signin-modal'
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  GenerateToken(content: any) :void {
    this.userService.getToken(content)
  }




  onGenToken(content: any) {
    //test

    this.userService.getToken(content).subscribe(

      (response: TokenResponse) => {



        if(response.status == 'failed'){
          let data = <FailedData>response.data;
          // TODO: How to show the failed message?
          //test
          alert("Incorrect Email or Password");
          return;
        }


        //return;
        let data = <TokenSuccessData>response.data;
        GlobalComponent.token = data.access_token;
        GlobalComponent.tokenType = data.token_type;
        this.onCheckToken(data.access_token);
      },
      (e) => {
        // TODO: error handling
        console.log(e);
        alert("Incorrect Email or Password");
        return;
      }
    );
    //test

  }

  onCheckToken(token: string) {


    this.userService.getUserid(token).subscribe(
      (reponse: UserInfoResponse) => {
        if(reponse.status == 'failed'){
          let data = <FailedData>reponse.data;
          // TODO: How to show the failed message?

          alert("Incorrect Email or Password");

          return;
        }
        //test


        let data = <UserInfoSuccessData>reponse.data;
        let user_info = data.user_info;
        if(user_info.is_verified){
          GlobalComponent.userid = user_info.id;
          console.log(user_info.id)
          GlobalComponent.regIn = <string>user_info.join_date;
          GlobalComponent.logo = <string>user_info.logo_path;
          //this.checkIfVerified(user_info.email);
          this.router.navigate(['eshop']);
        }else{
          this.openModal();
        }
        //
        //   this.openModal();
        //
        // }
      // TODO: Not sure does it finish


      // if (reponse.data.verified) {
      //   console.log('valid token!' + reponse.data.userid);
      //   GlobalComponent.userid = <number>reponse.data.user_info?.id;
      //   GlobalComponent.regIn = reponse.data.join_date;
      //   GlobalComponent.logo = reponse.data.logo;
      // } else {
      //   this.isVerified = true;
      //   this.openModal();
      //   this.createAccount();
      // }
    },
    (e : Error) => {
      // TODO: error handling
      alert("Incorrect Email or Password");
    }
    );
  }
  goBack() {
    this.navCtrl.navigateBack(['login']);
  }

  //new 2023.6.16
  checkIfVerified(email: string){
      console.log("checkifverified called");
     this.userService.checkEmailVerification(email).subscribe(
        (response: emailVeriResponse) => {
          let status = <EmailVeriSucessData>response.data;
          if(status.verification == 0){
            this.openModal();
          }else{
            this.router.navigate(['eshop']);
          }



          //return response.message;
        }
      )

  }


  // createAccount() {
  //   let userinfo: regUser = {
  //     "nickname": GlobalComponent.regUserName,
  //     "email": GlobalComponent.regUserEmail,
  //     "password": GlobalComponent.regUserPwd,
  //     "phone": '',
  //     "address": '',
  //   };
  //   // let content = JSON.stringify(userinfo.toString());
  //   this.onPostUser(userinfo);
  // };

  // onPostUser(content: regUser): void {
  //   this.userService.regUser(content).subscribe(
  //     (response: regResponse) => {
  //       console.log("post sent, here is the response:" + response.data);
  //       if (response.status == 422) {
  //         console.log("error 422");
  //       }
  //     },
  //   );
  // }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0){
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    }else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    //return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  //get Http status code
  getHttpStatusCode(){

  }




}
