import { Component, OnInit } from '@angular/core';
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from "@capacitor-community/camera-preview";
import {AvatarCaptureComponent} from "../avatar/avatar-capture/avatar-capture.component";
import {
  AvatarCaptureFaceScanningComponent
} from "../avatar-capture-camera-face/avatar-capture-face-scanning/avatar-capture-face-scanning.component";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {AvatarCaptureBodyScanningSideComponent} from "./avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import {Router} from "@angular/router";
import {EmailConfirmComponent} from "../modals/email-confirm/email-confirm.component";
import {registerPlugin, PluginListenerHandle} from "@capacitor/core";
import {Motion, AccelListenerEvent, AccelListener} from "@capacitor/motion";
import {AvatarCaptureCameraBodyPage} from "../avatar-capture-camera-body/avatar-capture-camera-body.page";
import {Camera, CameraOptions} from "@capacitor/camera";
import { IonicModule } from '@ionic/angular'
//import {AvatarEmailComponent} from "../modals/email-confirm/AvatarEmailComponent.component";


@Component({
  selector: 'app-avatar-capture-camera-body',
  templateUrl: './avatar-capture-camera-body-side.page.html',
  styleUrls: ['./avatar-capture-camera-body-side.page.scss'],
})
export class AvatarCaptureCameraBodySidePage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              private router: Router,
              private AvatarCaptureCameraBodyPage: AvatarCaptureCameraBodyPage,
              private platform: Platform) { }

  ngOnInit() {
    // this.openCapture();
  }

  ngAfterViewInit() {
    this.openCapture();
  }
  image: any;
  imageSide:any;
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
    CameraPreview.stop();
    this.finishCapture= true;

  }

  async openCapture() {
    const modal = await this.modalCtrl.create({
      component: AvatarCaptureBodyScanningSideComponent,
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
    this.image = this.AvatarCaptureCameraBodyPage.getTemporaryPhoto();
  }


  generateAvatar() {
    this.getImagefromPreviousPage();
    console.log('Image data:', this.image);
    console.log('Image Side data:', this.image);


    this.presentAlert();
  }
  async presentAlert() {
    const modal = await this.modalCtrl.create({
      component: EmailConfirmComponent,
      componentProps: {},
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
  }


 // for IOS
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
      console.log('Device motion event:', event);
      console.log('Interval:', event.interval.toPrecision(10));
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

  // for Android
  async motionHandler() {

    try {
      let accelHandler: PluginListenerHandle;
      accelHandler = await Motion.addListener('accel', event => {
        console.log('Device motion event:', event);
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

  async stopMotionListener() {
    if (this.accelHandler) {
      await this.accelHandler.then(handler => {Motion.removeAllListeners()});;
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


}
