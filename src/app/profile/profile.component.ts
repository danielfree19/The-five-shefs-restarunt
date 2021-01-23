import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CRUDService } from '../services/crud.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { cart } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    Cart;
    recipt;
    displayName ;
    date = new Date();
    email;
    birthDay;
    address;
    phoneNum;
    recipts;
    reciptsIDs;
    flag=false;
    constructor(public af: AngularFireAuth,public crud:CRUDService,public db:AngularFireDatabase,public auth:AuthService,public router:Router) {
        let temp = '';
        this.displayName = af.user.forEach((user) => {
            temp += JSON.stringify(user) + '\n';
        })

    }
    onKey(event: any) { // without type info
      if(event.key === "Enter"){
        let string = event.target.value.toString();
        let key = 'address';
        console.log(string);
        this.crud.updateProfile(key,string);
      }
    }
    showRecipt(recID){
      this.db.list('/users/' + JSON.parse(sessionStorage.getItem('user')).uid).valueChanges().subscribe(reciptinfo=>{
        this.recipt=reciptinfo[1][recID];

        console.log(this.recipt)
        console.log(this.Cart)
      });

    }

    ngOnInit(): void {
      if(!this.auth.isConnected()){
        this.router.navigate(['/home']);
      }
      this.af.user.subscribe(user=>{
        this.displayName = user.displayName;
        this.email = user.email;
      });
      this.reciptsIDs=this.db.list('/users/' + JSON.parse(sessionStorage.getItem('user')).uid + '/recipts').snapshotChanges();
    }

}
