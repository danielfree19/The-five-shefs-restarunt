import { User } from '../user.model';
import { AuthService } from '../services/auth.service';
import { CartOI } from '../app.component';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipt',
  template:`
  <div class="container" style="text-align:center;">
  <style>
    td{
      padding:5px;
      margin-left:2px;
    }
  </style>
  <div class="row">
  <div class="col-6">
    מסעדת חמשת השפים
  </div>
  <div class="col-6">
    {{date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}}
  </div>
  <div class="col-6">
    כתובת: יוחנן הסנדלר 10 חיפה
  </div>
  <div class="col-6"></div>
  <div class="col-6">
    טלפון: 04-9910840
  </div>
  <div class="col-6"></div>
  <div class="col-12">
    <h1>קבלה</h1><!--recipt id in prog-->
    </div>
    <div class="col-6">
      {{"לכבוד, "+username}}
    </div>
  <div class="col-12">
  <table style="display:inline-block;">
    <tr *ngFor="let item of cart.cart">
      <td>  {{item.nameGet() }}</td>
      <td>{{"מחיר ליחידה: "+ item.priceGet()}}</td>

      <td>{{"כמות: " +  item.getAmount()}}</td>
    </tr>
  </table>
</div>

    <div class="col-4"></div>
    <div class="col-4">
      <h4>
        {{"מחיר כולל: " + totalPrice}}
      </h4>
    </div>
    <div class="col-4"></div>
  </div>
  </div>


  `
})
export class ReciptComponent implements OnInit {
  username;
  cartInfo;
  totalPrice;
  date;
  constructor(public authService:AuthService){

  }
  cart = CartOI;
  ngOnInit(): void {
    this.username = this.authService.user.displayName;
    this.cartInfo = JSON.stringify(CartOI);

    this.totalPrice = CartOI.getTotalPrice();
    this.date = new Date();
  }
}
