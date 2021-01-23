import { Component, OnInit } from '@angular/core';
import { cart } from '../services/cart.service';
var counters:number[] = [0,0];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgURL = '../../assets/img/jpg/'+counters[0]+'.jpg';
  isActive=true;
  r=0;
  nextPic(){
    counters[0]++;
    if(counters[0]==22){
      counters[0]=0;
    }
    this.imgURL="../../assets/img/jpg/"+counters[0]+".jpg";
  }
  prevPic(){
    counters[0]--;
    if(counters[0]==-1){
      counters[0]=21;
    }
    this.imgURL="../../assets/img/jpg/"+counters[0]+".jpg";
  }
  start(){
    if(this.isActive){
      this.isActive = false;
    }
    else{
      this.isActive = true;
    }
  }
  constructor(private Cart:cart) {
    setInterval(() => {
      if(this.isActive){
        if(this.r==8){
          this.nextPic();
          this.r=0;
        }
        else{
          this.r++;
        }

      }
       else if(this.r!=0)
       {
         this.r=0;
        }
    }, 1000);

   }

  ngOnInit(): void {
  }

}
