import {Component} from '@angular/core';
import { AppIcon } from '@capacitor-community/app-icon';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  icons = [
    'wild', 'light'
  ];
  selected = '';

  constructor() {
    this.loadCurrentIcon();
  }

  async loadCurrentIcon() {
    let currentIcon = await AppIcon.getName();
    this.selected = currentIcon.value;
  }

  async setIcon(name: string) {
    const isSupported = await AppIcon.isSupported();

    if (isSupported.value) {
      await AppIcon.change({name: name, suppressNotification: false});
      this.loadCurrentIcon();
    }
  }

  async reset() {
    await AppIcon.reset({suppressNotification: true});
    this.loadCurrentIcon();
  }

}
