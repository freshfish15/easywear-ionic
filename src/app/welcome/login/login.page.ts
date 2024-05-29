import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private routerOutlet: IonRouterOutlet,
    private router : Router) {
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // this.routerOutlet.swipeGesture = false;
  }
  ionViewDidLeave(){
    this.routerOutlet.swipeGesture = true;
  }
  goshop(){
    this.router.navigate(['eshop']);
  }
}
