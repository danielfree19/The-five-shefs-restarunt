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
  template:`
  <div class="content" style="text-align:center;">
  <div>
  <div>
      {{date}}
  </div>
  <div>
       מסעדת חמשת השפים
  </div>
  <div>
    כתובת: יוחנן הסנדלר 10 חיפה<br>
    טלפון: 04-9910840
    </div>
      <h1>{{" קבלה מס "+reciptnum}}</h1><!--recipt id in prog-->
      {{"לכבוד, "+username}}
      <h4>
        {{"מחיר כולל: " + totalPrice}}
  </h4>
    </div>
    <div style="display:inline-block;">
  <div class="row" >
    <div *ngFor="let item of Items" class="card border-light mb-3 col-4" style="max-width: 18rem;margin-left:5px;max-height: fit-content;min-width:200px;">
      <div class="card-header" >
      <img src="../../assets/img/Menu/{{item.pic}}.jpg" class="pic_size" alt="">
      </div>
      <div class="card-body">
        <h5 class="card-title">{{item.name }}</h5>
        <p class="card-text">
          {{"מחיר ליחידה: "+ item.price}}
          {{"כמות: " +  item.amount}}
        </p>
      </div>
    </div>
  </div>
  </div>

  </div>







  `
})
export class ReciptComponent implements OnInit,OnDestroy {
  username;
  cartInfo;
  totalPrice;
  date;
  recipt;
  Items;
  reciptnum = this.param.snapshot.paramMap.get('id');
  constructor(public authService:AuthService,public db:AngularFireDatabase,public param:ActivatedRoute){
  }
  cart = CartOI;
  ngOnInit(): void {
    this.db.list('/users/' + JSON.parse(sessionStorage.getItem('user')).uid).valueChanges().subscribe(info=>{
      this.recipt = info[1][this.reciptnum];
      this.date = this.recipt.thisdate;
      this.username = info[0]['displayname']
      this.cartInfo = this.recipt['cartItems'];
      this.Items = this.cartInfo.cart;
      this.totalPrice = this.cartInfo.totalcost;
    })
  }
  ngOnDestroy(){

  }
}
