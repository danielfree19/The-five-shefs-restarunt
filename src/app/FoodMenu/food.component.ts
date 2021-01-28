import { CartOI } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { cart } from '../services/cart.service';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls:['FoodMenu.component.css']
})
export class FoodComponent implements OnInit {

    menuItems$:any;
    constructor(db:AngularFireDatabase,public Cart:cart){
         db.list('/menu').valueChanges().subscribe(menuItems=>{
           this.menuItems$ = menuItems;
         });
    }
    addToCart(pic,name,price){
      CartOI.addItem(pic,name,price);
      console.log(CartOI.toString());
    }

    ngOnInit(): void {

    }

}
