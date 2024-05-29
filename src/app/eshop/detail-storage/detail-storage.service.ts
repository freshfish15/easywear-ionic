import { Injectable } from '@angular/core';
import {ClothInfo} from '../../interface/AllResponse';

@Injectable({
  providedIn: 'root'
})
export class DetailStorageService {
  ProductData: ClothInfo;
  arrayIndex: number;
  isFemale: boolean;
  constructor() { }

  setProductData(data: ClothInfo){
    this.ProductData = data;
  }

  getProductData(){
    return this.ProductData;
  }

  setArrayIndex(arr: number){
    this.arrayIndex = arr;
  }

  getArrayIndex(){
    return this.arrayIndex;
  }

  setisFemale(gender: boolean){
    this.isFemale = gender;
  }

  getisFemale(){
    return this.isFemale;
  }

}
