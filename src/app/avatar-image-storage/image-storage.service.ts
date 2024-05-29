import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  frontBodyImg: string;
  sideBodyImg: string;

  constructor() { }

  storeFrontImg(img: string){
    this.frontBodyImg = img;
  }

  storeSideImg(img: string){
    this.sideBodyImg = img;
  }

  getFrontImg(){
    return this.frontBodyImg;
  }

  getSideImg(){
    return this.sideBodyImg;
  }

}
