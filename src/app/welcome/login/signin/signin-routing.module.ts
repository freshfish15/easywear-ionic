import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninPage } from './signin.page';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninPage
  },
  {
    path: '',
    component: SigninPage
  },
  {
    path: 'create',
    redirectTo: '../create', pathMatch: 'full'
  },
  {
    path: 'forgot',
    redirectTo: '../forgot', pathMatch: 'full'
  },
  {
    path: 'eshop',
    redirectTo: '../../../eshop', pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   redirectTo: '../login', pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninPageRoutingModule { }
