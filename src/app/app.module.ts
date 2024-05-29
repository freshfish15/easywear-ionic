import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { SigninComponent } from './modals/signin/signin.component';
import { EmailConfirmComponent } from './modals/email-confirm/email-confirm.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AvatarCaptureEnteringDataGuideComponent} from "./avatar-capture-entering-data/avatar-capture-entering-data-guide/avatar-capture-entering-data-guide.component";
import {AvatarCaptureCameraBodyPageModule} from "./avatar-capture-camera-body/avatar-capture-camera-body.module";

@NgModule({
  declarations: [AppComponent, EmailConfirmComponent, SigninComponent, ChangePasswordComponent,AvatarCaptureEnteringDataGuideComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    animated:false
  }), AppRoutingModule,HttpClientModule,LazyLoadImageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
