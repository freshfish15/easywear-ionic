import { Component, OnInit } from '@angular/core';
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from "@capacitor-community/camera-preview";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})

export class TestingPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.openCamera();
  }

  image:any;
  cameraActive = false;
  finishCapture = false;

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

}
