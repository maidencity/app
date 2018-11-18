import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../pages/home/home.module#HomeModule'
  },
  {
    path: 'list',
    loadChildren: '../pages/list/list.module#ListModule'
  },
  {
    path: 'login',
    loadChildren: '../pages/login/login.module#LoginModule'
  },
  {
    path: 'tutorial',
    loadChildren: '../pages/tutorial/tutorial.module#TutorialModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
