import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendPage } from './send.page';

const routes: Routes = [
  {
    path: '',
    component: SendPage
  },
  {
    path: 'signin',
    redirectTo: '../../signin', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPageRoutingModule {}
