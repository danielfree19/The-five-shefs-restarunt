import { ReciptComponent } from './recipt/recipt.component';
import { ForderComponent } from './forder/forder.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FoodMenuComponent } from './FoodMenu/FoodMenu.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  {
    path: 'menu', component: MenuComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'FoodMenu', component: FoodMenuComponent
  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'orderup', component: ForderComponent
  },
  {
    path: 'profile', component: ProfileComponent,
    children:[
      {
        path: 'recipt/:id', component: ReciptComponent
      }
    ]
  },
  {
    path: '**', redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
