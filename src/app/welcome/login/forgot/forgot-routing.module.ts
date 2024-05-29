import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPage } from './forgot.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPage
  },
  {
    path: 'forgot',
    component: ForgotPage
  },
  {
    path: 'signin',
    redirectTo: '../signin', pathMatch: 'full'
  },
  {
    path: 'send/:email',
    loadChildren: () => import('./send/send.module').then( m => m.SendPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPageRoutingModule {}
