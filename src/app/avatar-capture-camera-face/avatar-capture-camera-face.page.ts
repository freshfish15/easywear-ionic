import {Component, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from "@capacitor-community/camera-preview";
import {
  AvatarCaptureFaceScanningComponent
} from "./avatar-capture-face-scanning/avatar-capture-face-scanning.component";
import {LoadingController, ModalController, NavController} from "@ionic/angular";
//import {CameraDataService} from "../avatar-capture-data/camera-data.service";
import {ActivatedRoute} from "@angular/router";
import {GalleryImageOptions, ImageOptions} from "@capacitor/camera/dist/esm/definitions";

@Component({
  selector: 'app-avatar-capture-camera-face',
  templateUrl: './avatar-capture-camera-face.page.html',
  styleUrls: ['./avatar-capture-camera-face.page.scss'],
})
export class AvatarCaptureCameraFacePage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private  loadingCtrl: LoadingController,
              //private cameraDataService: CameraDataService,
              private navCtrl: NavController,
              private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.openCapture();
  }

  image:any;
  cameraActive = false;
  finishCapture = false;
  photoData: string;



   openCamera(){
     const cameraPreviewOptions: CameraPreviewOptions={
       position: 'front',
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


     this.image = `data:image/jpeg;base64,${result.value}`;
     CameraPreview.stop();
     this.finishCapture= true;

   }

  async openCapture() {
    const modal = await this.modalCtrl.create({
      component: AvatarCaptureFaceScanningComponent,
      cssClass: 'customModalSettingFull',
      componentProps: {},
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
    this.openCamera();
  }

  refresh(): void {
    window.location.reload();
  }





  // async onSave() {
  //   const loading = await this.loadingCtrl.create();
  //   loading.present();
  //   const currentState = this.cameraDataService.getState();
  //   if (currentState === 0){
  //     const type = this.cameraDataService.getState();
  //     // add image to db
  //     const photo = {
  //       photo_type: type,
  //       photo_src: this.photoData,
  //       //photo_ori: this.orientationData
  //     };
  //     //TODO YP Here cannot use localStorage
  //     // this.photoDataService.addPhoto(photo, this.profileId).subscribe( success => {
  //     //   if (success){
  //     //     // this.cameraDataService.incrementState();
  //     //     // this.router.navigate(['../camera'], { relativeTo: this.activatedRoute });
  //     //     // this.cameraDataService.storePhotoData(photo).then( () => {
  //     //     // });
  //     //   }
  //     // });
  //     //this.cameraDataService.incrementState();
  //     // this.router.navigate(['../camera'], { relativeTo: this.activatedRoute });
  //     // this.navCtrl.back();
  //     //this.cameraDataService.storePhotoData(photo);
  //     setTimeout(()=>{
  //       loading.dismiss().then(()=>{
  //         this.navCtrl.back();
  //       });
  //       // this.router.navigate(['../result'], { relativeTo: this.activatedRoute });
  //     },500);
  //   }
  //   else if (currentState === 1){
  //     const type = this.cameraDataService.getState();
  //     const photo = {
  //       photo_type: type,
  //       photo_src: this.photoData,
  //       // photo_ori: this.orientationData
  //     };
  //     //TODO YP Delete Photo upload to server with side phone
  //     // this.photoDataService.addPhoto(photo, this.profileId).subscribe( success => {
  //     //   if (success){
  //     //     // this.cameraDataService.resetState();
  //     //     // this.router.navigate(['../result'], { relativeTo: this.activatedRoute });
  //     //     // this.cameraDataService.storePhotoData(photo).then( () => {
  //     //     // });
  //     //   }
  //     // });
  //     // this.cameraDataService.resetState();
  //     // this.cameraDataService.storePhotoData(photo);
  //     setTimeout(()=>{
  //       // this.navCtrl.back();
  //       loading.dismiss().then(()=>{
  //         this.navCtrl.navigateForward(['../result'],{ replaceUrl:true,relativeTo: this.activatedRoute });
  //       });
  //       // this.router.navigate(['../result'], { relativeTo: this.activatedRoute });
  //     },500);
  //   }
  // }
    protected readonly CameraPreview = CameraPreview;

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


     this.image = `data:image/jpeg;base64,${result.base64String}`;
     console.log(this.image);
     this.finishCapture= true;


   }
}
