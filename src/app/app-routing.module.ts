import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'eshop',
    loadChildren: () => import('./eshop/eshop.module').then(m => m.EshopPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    // path: '',
    // redirectTo: 'testing',
    // pathMatch: 'full'
  },
  {
    path: 'fitting-room',
    loadChildren: () => import('./fitting-room/fitting-room.module').then(m => m.FittingRoomPageModule)
  },
  {
    path: 'avatar',
    loadChildren: () => import('./avatar/avatar.module').then(m => m.AvatarPageModule)
  },
  {
    path: 'avatar-capture-camera-body',
    loadChildren: () => import('./avatar-capture-camera-body/avatar-capture-camera-body.module').then( m => m.AvatarCaptureCameraBodyPageModule)
  },
  {
    path: 'avatar-capture-camera-body-side',
    loadChildren: () => import('./avatar-capture-camera-body-side/avatar-capture-camera-body-side.module').then(m => m.AvatarCaptureCameraBodySidePageModule)
  },
  {
    path: 'avatar-capture-camera-face',
    loadChildren: () => import('./avatar-capture-camera-face/avatar-capture-camera-face.module').then( m => m.AvatarCaptureCameraFacePageModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./testing/testing.module').then( m => m.TestingPageModule)
  },
  {
    path: '',
    redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./welcome/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'avatar-management',
    loadChildren: () => import('./avatar-management/avatar-management.module').then( m => m.AvatarManagementPageModule)
  },
  {
    path: 'modals',
    loadChildren: () => import('./modals/modals.module').then( m => m.ModalsPageModule)
  },
  {
    path: 'icon',
    loadChildren: () => import('./avatars/icon/icon.module').then( m => m.IconPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./avatars/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'avatar-capture-entering-data',
    loadChildren: () => import('./avatar-capture-entering-data/avatar-capture-entering-data.module').then( m => m.AvatarCaptureEnteringDataPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'avatar-capture-camera-sidebody',
    loadChildren: () => import('./avatar-capture-camera-sidebody/avatar-capture-camera-sidebody.module').then( m => m.AvatarCaptureCameraSidebodyPageModule)
  },
  {
    path: 'avatar-capture-camera-result',
    loadChildren: () => import('./avatar-capture-camera-result/avatar-capture-camera-result.module').then( m => m.AvatarCaptureCameraResultPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    IonicModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
