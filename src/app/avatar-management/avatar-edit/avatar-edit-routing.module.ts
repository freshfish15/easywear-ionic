import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarEditPage } from './avatar-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarEditPageRoutingModule {}
