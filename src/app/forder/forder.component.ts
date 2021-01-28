import { Component, OnInit } from '@angular/core';
import { CartOI } from './../../app/app.component';
import { AuthService } from '../services/auth.service';
import {CRUDService} from '../services/crud.service';
import  firebase  from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { getLocaleDateTimeFormat } from '@angular/common';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forder',
  templateUrl: './forder.component.html',
  styleUrls: ['./forder.component.css']
})

export class ForderComponent implements OnInit {
  /*
  isConnected V
  getCart V
  payment method => cash || credit => 1234456489783213 | 02/21 | 321 V except verification V
  database write
  maybe delivery or take away or sit at the table
  */

 cart;
 credit = false;
 credittxt="";
 creditInfo:creditCard[]=[];
 a:Date = new Date();//min="2018-01"
 date = (this.a.getFullYear() + "-" + "0"+(this.a.getMonth()+2)).toString();
 insertCreditIn(price,Cnum,ExpDate,digits,ID){
    price = parseInt(price);
    if( (price+this.totalInCreditCard()) > CartOI.getTotalPrice()){
      console.log(this.totalInCreditCard() + " " + price + " " + CartOI.getTotalPrice())
    }
    else{
        this.creditInfo.push(new creditCard(price,Cnum,ExpDate,digits,ID));

        console.log(this.creditInfo);
    }
 }
 totalInCreditCard(){
  let sum:number =0;
  this.creditInfo.forEach((card)=>{
    sum+=card.getPrice();
  })
  return sum;
 }


 isCredit(){
   this.credit = !this.credit;
 }

  constructor(
    public authService: AuthService,
    private library: FaIconLibrary,
    public CRUDService:CRUDService,
    public db:AngularFireDatabase,
    public router:Router) {
    this.cart = CartOI;
    library.addIcons(
      faTrashAlt
    );

  }
  reID = (this.a.getMonth() + 1) + "54535" + this.a.getMilliseconds();
  completeTransaction(){
   if(this.authService.isConnected()){
    this.CRUDService.Addrecipt(CartOI,this.reID,CartOI.totalPrice()-this.totalInCreditCard(),this.creditInfo)// cart
    this.remCookie();
    this.router.navigate(["/recipt/"+this.reID])
   }
   else{
     console.log("Connect as a registered user first");
   }
  }
  ngOnInit(): void {
  }
  remFunc(item){
    this.creditInfo.splice(this.creditInfo.indexOf(item),1);
  }
  remCookie() {
    sessionStorage.removeItem('cart');
    this.cart.cart.splice(0);
  }
}
class creditCard{
  constructor(private price:number,private Cnum,private ExpDate,private digits,private ID){
    this.price=price;
    this.Cnum = Cnum;
    this.ExpDate =ExpDate;
    this.digits = digits;
    this.ID = ID;
  }
  setprice(price){
    this.price = price;
  }
  setCnum(Cnum){
    this.Cnum = Cnum;
  }
  setExpDate(ExpDate){
    this.ExpDate = ExpDate;
  }
  setdigits(digits){
    this.digits = digits;
  }
  setID(ID){
    this.ID=ID;
  }
  getPrice(){
    return this.price;
  }
  getCnum(){
    return this.Cnum;
  }
  getLastdigitsCnum(){
    return this.Cnum.replace(/\s/g, "").substring(this.Cnum.replace(/\s/g, "").length-4);
  }
  getExpDate(){
    return this.ExpDate;
  }
  getDigits(){
    return this.digits
  }
  getID(){
    return this.ID;
  }

}
