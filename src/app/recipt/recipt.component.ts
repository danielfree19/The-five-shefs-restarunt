import { AuthService } from '../services/auth.service';
import { CartOI } from '../app.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipt',
  styleUrls:["./recipt.component.css"],
  templateUrl:'./recipt.component.html'
})
export class ReciptComponent implements OnInit,OnDestroy {
  username;
  cartInfo;
  totalPrice;
  date;
  recipt;
  Items;
  reciptnum;
  sub;
  constructor(public authService:AuthService,public db:AngularFireDatabase,public param:ActivatedRoute){
    this.sub = this.param.params.subscribe(value=>{
      this.reciptnum = value.id;
      this.oninit()
    })
  }
  cart = CartOI;
  ngOnInit(): void {

  }
  oninit(){
    this.db.list('/users/' + JSON.parse(sessionStorage.getItem('user')).uid).valueChanges().subscribe(info=>{
      this.recipt = info[1][this.reciptnum];
      this.date = this.recipt.thisdate;
      this.username = this.authService.user.displayName;
      this.cartInfo = this.recipt['cartItems'];
      this.Items = this.cartInfo.cart;
      this.totalPrice = this.cartInfo.totalcost;
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
