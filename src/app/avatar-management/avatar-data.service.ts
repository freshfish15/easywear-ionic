import { Injectable } from '@angular/core';
import {AvatarInfo, AvatarResponse} from "../interface/AllResponse";

@Injectable({
  providedIn: 'root'
})
export class AvatarDataService {
  avatarList: AvatarInfo;

  constructor() { }

  storeAvatarList(avatar: AvatarInfo){
    this.avatarList = avatar;
    console.log("avatar list service: " + this.avatarList)
  }

  getAvatarList(){
    console.log("AvatarList in detail page: " + this.avatarList)
    return this.avatarList;
  }

}
