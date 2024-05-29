import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvatarManagementPage } from './avatar-management.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarManagementPage
  },
  {
    path: 'avatar-detail',
    loadChildren: () => import('./avatar-detail/avatar-detail.module').then( m => m.AvatarDetailPageModule)
  },
  {
    path: 'avatar-detail/:type',
    loadChildren: () => import('./avatar-detail/avatar-detail.module').then( m => m.AvatarDetailPageModule),
  },
  {
    path: 'avatar-edit',
    loadChildren: () => import('./avatar-edit/avatar-edit.module').then( m => m.AvatarEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarManagementPageRoutingModule {}
