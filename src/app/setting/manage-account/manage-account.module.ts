import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAccountPageRoutingModule } from './manage-account-routing.module';

import { ManageAccountPage } from './manage-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAccountPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [ManageAccountPage]
})
export class ManageAccountPageModule {}
