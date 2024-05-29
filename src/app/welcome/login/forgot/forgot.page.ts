import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email: string = '';
  filled: boolean;
  forgotForm: FormGroup;
  constructor() {
    this.filled = false;

    this.forgotForm = new FormGroup({
      email: new FormControl('', ([
        Validators.required,
        Validators.email])),
    });
  }

  ngOnInit() {
    if (window.innerWidth > 700) {
      document.getElementById("emailInput")?.style.setProperty('width', '75vw');
      document.getElementById("email")?.style.setProperty('left', '12vw');
    }
  }

  checkFill() {
    if (this.email != '') {
      document.getElementById('reset')?.setAttribute('disabled', 'false');
      document.getElementById('reset')?.style.setProperty('opacity', '0.9');
    } else {
      document.getElementById('reset')?.setAttribute('disabled', 'true');
      document.getElementById('reset')?.style.setProperty('opacity', '0.5');
    }
  }

  isValid(): boolean {
    // return true;
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+/;
    if (pattern.test(this.email)) {
      // this.onGenToken(this.email, this.password);
      return true;
    } else {
      return false;
    }
  }

  onKey(event : any){
    this.email += event.target.value + ' | ';
  }
}
