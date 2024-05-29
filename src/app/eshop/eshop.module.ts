import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EshopPageRoutingModule} from './eshop-routing.module';

import {EshopPage} from './eshop.page';
import {EshopItemComponent} from './components/eshop-item/eshop-item.component';
import {EshopDetailComponent} from './components/eshop-detail/eshop-detail.component';
// import {LazyLoadImageModule} from 'ng-lazyload-image';
import {HttpClientModule} from "@angular/common/http";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {EshopItemWrapperComponent} from "./components/eshop-item-wrapper/eshop-item-wrapper-component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EshopPageRoutingModule,
        // LazyLoadImageModule,
        HttpClientModule,
        LazyLoadImageModule
    ],
  declarations: [EshopPage, EshopItemComponent, EshopDetailComponent,EshopItemWrapperComponent]
})
export class EshopPageModule {

}
