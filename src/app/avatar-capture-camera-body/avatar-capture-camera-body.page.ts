import { Component, OnInit } from '@angular/core';
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from "@capacitor-community/camera-preview";
import {AvatarCaptureComponent} from "../avatar/avatar-capture/avatar-capture.component";
import {
  AvatarCaptureFaceScanningComponent
} from "../avatar-capture-camera-face/avatar-capture-face-scanning/avatar-capture-face-scanning.component";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {AvatarCaptureBodyScanningComponent} from "./avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import {Router} from "@angular/router";
import {EmailConfirmComponent} from "../modals/email-confirm/email-confirm.component";
import {registerPlugin, PluginListenerHandle, Capacitor} from "@capacitor/core";
import {Motion, AccelListenerEvent, AccelListener} from "@capacitor/motion";
import {image, reader} from "ionicons/icons";
import {ImageStorageService} from "../avatar-image-storage/image-storage.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {ImageOptions} from "@capacitor/camera/dist/esm/definitions";


@Component({
  selector: 'app-avatar-capture-camera-body',
  templateUrl: './avatar-capture-camera-body.page.html',
  styleUrls: ['./avatar-capture-camera-body.page.scss'],
})
export class AvatarCaptureCameraBodyPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              private platform: Platform,
              private router: Router,
              private imageStorage: ImageStorageService) { }

  ngOnInit() {
    // this.openCapture();
    // if(this.platform.is('android')){
    //   this.motionHandler();
    // }
  }

  ngAfterViewInit() {
    this.openCapture();
    // if(this.platform.is('android')){
    //   this.motionHandler();
    // }
  }

  front_image:any;
  cameraActive = false;
  finishCapture = false;
  email: any;
  isPhoneVertical: boolean = false;
  accelHandler: Promise<PluginListenerHandle>;
  deviceMotion: DeviceMotionEvent;
  G: number = 9.8;
  AccelEventData: AccelListenerEvent | undefined;
  ZLineLength:number  = 0;
  ZLinePosition: number = 0;
  RotationXAngle: number = 0;
  RotationZAngle: number = 0;
  lineColor: string = "#cf3c4f"
  // ReminderFinish: boolean = false;
  // isAlertOpen: boolean = false;
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


    this.front_image = `data:image/jpeg;base64,${result.value}`;` =300`
    CameraPreview.stop();
    //this.image = reader.result as string
    this.imageStorage.storeFrontImg(this.front_image);
    localStorage.setItem("bodyImage", this.front_image);
    //this.handleImageUpload();
    this.finishCapture= true;

  }

  getTemporaryPhoto(): string {
    return this.front_image;
  }

  async openCapture() {
    const modal = await this.modalCtrl.create({
      component: AvatarCaptureBodyScanningComponent,
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
            if(this.platform.is('android')){
              this.motionHandler();
            }else{
              this.requestMotionPermission();
            }
          }
        }],
    });
    await alert.present();
  }

  generateAvatar() {
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


  async presentAvatarAlert() {
    const alert = await this.alertController.create({
      header: 'YOUR AVATAR IS GENERATING',
      cssClass: 'custom-alert',
      buttons: [{
        text: 'Back to Eshop',
        handler: () => {
          this.router.navigateByUrl('/eshop');
        }
      }],
      message: `<img src="/assets/generate_avatar.png/"></i>` +
        'We’ll send email to ' + this.email + ' once the avatar’s generating process is completed.'
    });
    await alert.present();
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
      // console.log('Device motion event:', event);
      // console.log('Interval:', event.interval.toPrecision(10));
      this.AccelEventData = event;
      {
        this.RotationXAngle = event.accelerationIncludingGravity.x * (90 / this.G);
        this.RotationZAngle = event.accelerationIncludingGravity.x * (90 / this.G);
        this.ZLineLength = (this.G - Math.abs(event.accelerationIncludingGravity.z) + 1) / this.G;
        this.ZLinePosition = (this.G - event.accelerationIncludingGravity.z) * 6;

        this.isPhoneVertical = (event.accelerationIncludingGravity.y < -9.5);
        if (this.isPhoneVertical) this.lineColor = "#008000"
        else this.lineColor = "#cf3c4f";
      }

    });
  }

  async motionHandler() {

    try {
      let accelHandler: PluginListenerHandle;
      accelHandler = await Motion.addListener('accel', event => {
        // console.log('Device motion event:', event);
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

  async pickPhotoFromLibary() {

    // const GalleryImageOptions: GalleryImageOptions = {
    //   quality: 100,
    //   limit: 1,
    // };
    // const pick = await Camera.pickImages(GalleryImageOptions);

    const ImageOptions: ImageOptions = {
      quality: 100,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    }

    const result = await Camera.getPhoto(ImageOptions);


    this.front_image = `data:image/jpeg;base64,${result.base64String}`;
    this.finishCapture= true;


  }



}
