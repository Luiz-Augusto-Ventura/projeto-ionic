import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'post-details/:id', loadChildren: './pages/post-details/post-details.module#PostDetailsPageModule' },
  { path: 'make-a-post', loadChildren: './pages/make-a-post/make-a-post.module#MakeAPostPageModule' },
  { path: 'make-a-post/:id', loadChildren: './pages/make-a-post/make-a-post.module#MakeAPostPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
