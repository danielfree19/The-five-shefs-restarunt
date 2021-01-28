

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })


export class cart{
    info;
    constructor(){
        this.info = JSON.parse(sessionStorage.getItem("cart"));
        if (!this.info) {
            this.info = [];
          }
        for(let i=0 ;i<this.info.length;i++){
            this.addItem(this.info[i]["pic"],this.info[i]["name"],this.info[i]["price"],this.info[i]["amount"]);
        }
        this.info = [];
    }; // [{pic:number name price amount},{}]
    totalcost:number=0;
    public cart:items[]=[]
    public addItem(pic,name,price,amount?){
      let flag:Boolean;
      if(!amount){
       flag=true;
            for(let item of this.cart){
             if(item.picGet() == pic){
                 item.addAmount();
                 flag = false;
             }
            }
         if(flag){
            this.cart.push(new items(pic,name,price));
         }
       }
        else{
            this.cart.push(new items(pic,name,price,amount));
        }

        sessionStorage.setItem("cart",JSON.stringify(this.cart));

    }
    AddAmount(item){
        item.addAmount();
        sessionStorage.setItem("cart",JSON.stringify(this.cart));
    }
    DecAmount(item){
        item.decAmount();
        sessionStorage.setItem("cart",JSON.stringify(this.cart));
    }

    public totalPrice(){
        this.totalcost =0;
        for(let item of this.cart){
            this.totalcost += item.getTotal();
        }
        return this.totalcost;
    }
    public toString(){
      let result="";
      result="";
      this.cart.forEach((value)=>{
          result+=value.nameGet()+" "+value.priceGet()+" "+value.getAmount()+"\n";
      });

      return result;
    }
    remFunc(item){
        this.cart.splice(this.cart.indexOf(item),1);
        sessionStorage.setItem("cart",JSON.stringify(this.cart));
      }
    numOfItems(){
          let i=0;
          this.cart.forEach((value)=>{
              i+=value.getAmount();
          })
          return i;
    }
    getTotalPrice(){
        let result=0;
        this.cart.forEach((item)=>{
            result+=item.getTotal();
        });
        return result;
    }
}
export class items{
    constructor(private pic,private name,private price:number,private amount?:number){
        this.name = name;
        this.pic = pic;
        this.price = price;
        if(!amount){
            amount=1;
        }
        this.amount=amount;
    }
    public nameSet(name){
        this.name=name;
    }
    public nameGet(){
        return this.name;
    }
    public priceSet(price){
        this.price=price;
    }
    public priceGet(){
        return this.price;
    }
    public picSet(pic){
        this.pic=pic;
    }
    public picGet(){
        return this.pic;
    }
    public addAmount(){
        this.amount++;

    }
    public decAmount(){
        if(this.amount!=1){
            this.amount--;
        }
    }
    public setAmount(amount){
        this.amount=amount;
    }
    public getAmount(){
        return this.amount;
    }
    public getTotal(){
        return this.amount*this.price;
    }
}
