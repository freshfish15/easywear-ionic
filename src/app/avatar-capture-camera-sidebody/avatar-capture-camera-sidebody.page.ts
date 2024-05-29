import { Component, OnInit } from '@angular/core';
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from "@capacitor-community/camera-preview";
import {AvatarCaptureComponent} from "../avatar/avatar-capture/avatar-capture.component";
import {
  AvatarCaptureFaceScanningComponent
} from "../avatar-capture-camera-face/avatar-capture-face-scanning/avatar-capture-face-scanning.component";
import {AlertController, LoadingController, ModalController, NavController, Platform} from "@ionic/angular";
import {AvatarCaptureSideBodyScanningComponent} from "./avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import {NavigationExtras, Router} from "@angular/router";
import {EmailConfirmComponent} from "../modals/email-confirm/email-confirm.component";
import {registerPlugin, PluginListenerHandle} from "@capacitor/core";
import {Motion, AccelListenerEvent, AccelListener} from "@capacitor/motion";
import {AvatarCaptureCameraBodyPage} from "../avatar-capture-camera-body/avatar-capture-camera-body.page";
import {Camera, CameraOptions, CameraResultType, CameraSource} from "@capacitor/camera";
import {EmtailorService} from '../emtailor/emtailor.service'
import {EmtailorDataService} from "../emtailor/emtailor-data.service";
import {environment as env} from "../../environments/environment";
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalComponent} from "../global-component";
import {userInfo} from "os";
import {
  AvatarCaptureEnteringDataComponent
} from "../avatar/avatar-capture-entering-data/avatar-capture-entering-data.component";
import {MeasureDataResponse, MeasureDataResponseData} from "../../main";
import {error} from "console";
import {catchError, Observable, of, timeout} from "rxjs";
import {ImageStorageService} from "../avatar-image-storage/image-storage.service";
import {ImageOptions} from "@capacitor/camera/dist/esm/definitions";

@Component({
  selector: 'app-avatar-capture-camera-sidebody',
  templateUrl: './avatar-capture-camera-sidebody.page.html',
  styleUrls: ['./avatar-capture-camera-sidebody.page.scss'],
})

@Injectable({ providedIn: 'root'})
export class AvatarCaptureCameraSidebodyPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              private router: Router,
              private http: HttpClient,
              private platform: Platform,
              private navController: NavController,
              private emtailorService: EmtailorService,
              private emtailorData: EmtailorDataService,
              private loadingCtrl: LoadingController,
              private imgStorage: ImageStorageService
  ) { }

  ngOnInit() {
    this.openCapture();
  }
  avatar_name: string = '';
  side_image: any;
  imageSide:any;
  front_image: any;
  cameraActive = false;
  finishCapture = false;
  email: any;
  isPhoneVertical: boolean = false;
  accelHandler: Promise<PluginListenerHandle>;
  G: number = 9.8;
  AccelEventData: AccelListenerEvent | undefined;
  ZLineLength:number  = 0;
  ZLinePosition: number = 0;
  RotationXAngle: number = 0;
  RotationZAngle: number = 0;
  lineColor: string = "#cf3c4f"
  ReminderFinish: boolean = false;
  isAlertOpen: boolean = false;
  public alertButtons = ['OK'];



  openCamera(){
    const cameraPreviewOptions: CameraPreviewOptions={
      position:'rear',
      parent:'cameraPreview',
      className:'cameraPreview',
      width: window.screen.width,
      height: window.screen.height,
      toBack:true,
    };
    CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;
  }
  async captureImage(){


    const cameraPreviewPictureOptions: CameraPreviewPictureOptions={
      quality:100,

    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);


    this.imageSide = `data:image/jpeg;base64,${result.value}`;
    this.imgStorage.storeSideImg(this.imageSide);
    localStorage.setItem("sideImage", this.imageSide);
    CameraPreview.stop();
    this.finishCapture= true;

  }

  async openCapture() {
    const modal = await this.modalCtrl.create({
      component: AvatarCaptureSideBodyScanningComponent,
      cssClass: 'customModalSettingFull',
      componentProps: {},
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
    if(this.platform.is('ios')){
      this.presentlevelAlert();
    }else if(this.platform.is('android')){
      this.openCamera()
      this.motionHandler();
    }
    else{
      this.openCamera();
    }
  }

  refresh(): void {
    window.location.reload();
  }

  async presentlevelAlert() {
    const alert = await this.alertController.create({
      header: 'Allow camera level?',
      cssClass: 'normal-alert',
      message: "This enable the function of camera level ",

      buttons:
      //   [{
      //   text: 'Cancel',
      //   role: 'cancel',
      //   handler: () => {
      //   }
      // },
        [{
          text: 'Confirm',
          handler:data=>{
            this.openCamera();
            this.requestMotionPermission();
          }
        }],
    });
    await alert.present();
  }
  getImagefromPreviousPage() {
    //this.image = this.AvatarCaptureCameraBodyPage.getTemporaryPhoto();
    this.side_image = localStorage.getItem("bodyImage")
  }


  async generateAvatar() {
    CameraPreview.stop();
    this.getImagefromPreviousPage();
    console.log('Image data:', localStorage.getItem("bodyImage"));
    //console.log('Image Side data:', localStorage.getItem("frontImage"));
    this.front_image = this.imgStorage.getFrontImg();//localStorage.getItem("bodyImage");
    this.side_image = this.imgStorage.getSideImg();//localStorage.getItem("sideImage");
    this.avatar_name = localStorage.getItem("AvatarName")
    let sex = localStorage.getItem('isFemale');

    let height = localStorage.getItem('height');
    let weight = localStorage.getItem('weight');
    let avatarName = localStorage.getItem('AvatarName')

    this.showLoading().then(() =>{
      this.emtailorData.getBodyMeasurementData(env.apiToken,
        this.front_image,
        this.side_image,
        height,
        weight,
        sex,
        1,
        avatarName,
        GlobalComponent.signinEmail)
      // pipe(
      //   catchError((error) => {
      //     alert("Error Occurred when computing images. Please try again. Error: " + error.statusText)
      //     this.loadingCtrl.dismiss();
      //     return of({data: {}, msg:error.statusText });
      //   })
      // )
        .subscribe((response) => {
          if(JSON.stringify(response.data) != undefined) {
            //localStorage.setItem("measureResult", response.data.toString());
            this.loadingCtrl.dismiss();
            this.navigateToResult();

          }else{
            this.presentErrorAlert();

          }
        },
        (error) => {
          console.log(error);
      })
    })
      .catch((error) => alert("Error Occurred when computing images. Please try again. Error: " + error.statusText));



    // this.showLoading().then(() =>{
    //   this.emtailorData.getBodyMeasurementData(env.apiToken,
    //     this.front_image,
    //     this.side_image,
    //     height,
    //     weight,
    //     sex,
    //     1,
    //     avatarName,
    //     GlobalComponent.signinEmail).
    //   pipe(
    //     catchError((error) => {
    //       alert("Error Occurred when computing images. Please try again. Error: " + error.statusText)
    //       this.loadingCtrl.dismiss();
    //       return of({data: {}, msg:error.statusText });
    //     })
    //   )
    //     .subscribe((response) => {
    //       if(JSON.stringify(response.data) != undefined) {
    //         //localStorage.setItem("measureResult", response.data.toString());
    //         this.loadingCtrl.dismiss();
    //         this.navigateToResult();
    //
    //       }else{
    //         console.log(response.msg);
    //         this.loadingCtrl.dismiss();
    //       }
    //     })
    // })
    //   .catch((error) => alert("Error Occurred when computing images. Please try again. Error: " + error.statusText));

    // this.getSizeData().then((data: MeasureDataResponseData) => {
    //   console.log("Size data: " + data);
    // })
    //setTimeout(this.navigateToResult,   15000);


    //await this.openEnteringData();


  }



  // getSizeData(): Promise<any> {
  //   return new Promise((resolve) => {
  //     let sex = localStorage.getItem('isFemale');
  //     const data = this.emtailorData.getBodyMeasurementData(env.apiToken, this.front_image, this.side_image, 171, 58, sex, 1 );
  //     resolve(data);
  //   })
  // }

  async presentAlert() {
    const modal = await this.modalCtrl.create({
      component: EmailConfirmComponent,
      componentProps: {},
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
  }

  navigateToResult() {

    this.router.navigate(['/avatar-capture-camera-result']);
  }

  async openEnteringData() {
    const modal = await this.modalCtrl.create({
      component: AvatarCaptureEnteringDataComponent,
      cssClass: 'customModalSetting',
      componentProps: {},
    });
    await this.stopMotionListener();
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

  }

  // for Android
  async motionHandler(){

    try {
      let accelHandler: PluginListenerHandle;
      accelHandler = await Motion.addListener('accel', event => {

        {
          this.RotationXAngle = event.accelerationIncludingGravity.x * (90 / this.G);
          this.RotationZAngle = event.accelerationIncludingGravity.x * (90 / this.G);
          this.ZLineLength = (this.G - Math.abs(event.accelerationIncludingGravity.z) + 1) / this.G;
          this.ZLinePosition = (this.G - event.accelerationIncludingGravity.z) * 6;

          this.isPhoneVertical = (event.accelerationIncludingGravity.y > 9.5);
          if (this.isPhoneVertical) this.lineColor = "#008000"
          else this.lineColor = "#cf3c4f";
        }
      });
    }catch (e) {
      return;
    }
  }


  //for IOS
  requestMotionPermission() {

    let accelHandler: PluginListenerHandle;
    let rotateHandler: PluginListenerHandle;

    try {
      (DeviceMotionEvent as any).requestPermission();
      (DeviceOrientationEvent as any).requestPermission();
    } catch (e) {
      // Handle error
      return;
    }

    this.accelHandler = Motion.addListener('accel', event => {
      // console.log('Device motion event:', event);
      // console.log('Interval:', event.interval.toPrecision(10));
      this.AccelEventData = event;
      {
        this.RotationXAngle = event.accelerationIncludingGravity.x * (90 / this.G);
        this.RotationZAngle = event.accelerationIncludingGravity.x * (90 / this.G);
        this.ZLineLength = (this.G - Math.abs(event.accelerationIncludingGravity.z) + 1) / this.G;
        this.ZLinePosition = (this.G - event.accelerationIncludingGravity.z) * 6;

        this.isPhoneVertical = (event.accelerationIncludingGravity.y < -9.6);
        if (this.isPhoneVertical) this.lineColor = "#008000"
        else this.lineColor = "#cf3c4f";
      }

    });
  }

  async stopMotionListener() {
    if (this.accelHandler) {
      await this.accelHandler.then(handler => {Motion.removeAllListeners()});
      this.accelHandler = undefined;
    }
  }

  calculateTilt() {
    if (this.AccelEventData) {

      this.RotationXAngle = this.AccelEventData.accelerationIncludingGravity.x * (90 / this.G);
      this.RotationZAngle = this.AccelEventData.accelerationIncludingGravity.x * (90 / this.G);
      this.ZLineLength = (this.G - Math.abs(this.AccelEventData.accelerationIncludingGravity.z) + 1) / this.G;
      this.ZLinePosition = (this.G - this.AccelEventData.accelerationIncludingGravity.z) * 6;

      this.isPhoneVertical = (this.AccelEventData.accelerationIncludingGravity.y < -9.6);
      if (this.isPhoneVertical) this.lineColor = "#008000"
      else this.lineColor = "#cf3c4f";
      requestAnimationFrame(() => this.calculateTilt());
    }




  }

  async showLoading() {
    setTimeout(() =>{
      this.loadingCtrl.dismiss;
      // alert("Processing Images time out!");
    }, 120000);
    const loading = await this.loadingCtrl.create({
    });
    return loading.present();
  }

  async pickPhotoFromLibary() {
    const ImageOptions: ImageOptions = {
      quality: 100,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    }

    const result = await Camera.getPhoto(ImageOptions);


    this.imageSide = `data:image/jpeg;base64,${result.base64String}`;
    this.imgStorage.storeSideImg(this.imageSide);
    this.finishCapture= true;

  }



  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error occurred when computing images',
      cssClass: 'normal-alert',
      message: "Please try again later",

      buttons:
      //   [{
      //   text: 'Cancel',
      //   role: 'cancel',
      //   handler: () => {
      //   }
      // },
        [{
          text: 'OK',
          handler:data=>{
            // this.router.navigate(['login'])
            this.navController.navigateBack(['avatar']);
          }
        }],
    });
    await alert.present();
  }


}
