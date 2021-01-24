import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CRUDService } from '../services/crud.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { cart } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
     displayName;
    disName;
    email;
    birthDay;
    address;
    phoneNum;
    profile;
    reciptsIDs
    date = new Date();
    flag=false;

    constructor(public af: AngularFireAuth,public crud:CRUDService,public db:AngularFireDatabase,public auth:AuthService,public router:Router) {

        console.log(this.profile+" const")

    }
    onKey(event: any) { // without type info
      if(event.key === "Enter"){
        let string = event.target.value.toString();
        let key = 'address';
        console.log(string);
        this.crud.updateProfile(key,string);
        console.log(this.profile +"  fun")
        console.log(this.profile[0])
    }
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
      console.log(this.profile +"  init")
      let id =JSON.parse(sessionStorage.getItem('user')).uid;
      this.db.list('/users/' +id+ '/profile/').valueChanges().subscribe(details => {
        this.birthDay = String(details[1]);
        this.address = String(details[0]);
        this.phoneNum = String(details[4]);
        this.profile.push(this.phoneNum);
        this.profile.push(this.address);
        this.profile.push(this.birthDay);
        this.profile.push(this.email);
        this.profile.push(this.displayName);
    });
    }

  }
