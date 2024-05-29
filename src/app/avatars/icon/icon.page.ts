import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.page.html',
  styleUrls: ['./icon.page.scss'],
})
export class IconPage implements OnInit {
  avatarC: string;

  constructor() {
    this.avatarC = "/assets/svg/AvatarChoiceC.svg";
  }

  ngOnInit() {
  }

}
