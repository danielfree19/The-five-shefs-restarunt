import { ReciptComponent } from './recipt/recipt.component';
import { cart } from './services/cart.service';
import { FoodComponent } from './FoodMenu/food.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { FoodMenuComponent } from './FoodMenu/FoodMenu.component';
import { SocialComponent } from './social/social.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { ForderComponent } from './forder/forder.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    FoodMenuComponent,
    SocialComponent,
    FoodComponent,
    AboutUsComponent,
    LoginComponent,
    ForderComponent,
    ReciptComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FontAwesomeModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
