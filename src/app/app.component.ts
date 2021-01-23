
import { Component } from '@angular/core';

import { cart, items } from './services/cart.service';
export const CartOI:cart=new cart();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  menuItems$;


  constructor(){


  }




  title = 'finalproj';
}
