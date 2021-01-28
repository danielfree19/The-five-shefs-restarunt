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
    reciptsIDs;
    date = new Date();
    flag=false;
    EditBtnText= 'Edit';
    ReciptViewFlag=false;
    ReciptViewFlagToggle(){
      this.ReciptViewFlag = !this.ReciptViewFlag;
    }
    constructor(public af: AngularFireAuth,public crud:CRUDService,public db:AngularFireDatabase,public auth:AuthService,public router:Router) {

        console.log(this.profile+" const")

    }

  EditProfile(){
    if(this.EditBtnText == 'Edit'){
    let nameInput = document.getElementById("DisplayName") as HTMLInputElement
    nameInput.disabled=false;
    let phoneInput = document.getElementById("PhoneNum") as HTMLInputElement
    phoneInput.disabled=false;
    let addressInput = document.getElementById("Address") as HTMLInputElement
    addressInput.disabled=false;
    let birthDayInput = document.getElementById("BirthDay") as HTMLInputElement
    birthDayInput.disabled=false;
    this.EditBtnText = 'Submit';
    }else{
      this.EditBtnText = 'Edit';
      let nameInput = document.getElementById("DisplayName") as HTMLInputElement
      nameInput.disabled=true;
      let phoneInput = document.getElementById("PhoneNum") as HTMLInputElement
      phoneInput.disabled=true;
      let addressInput = document.getElementById("Address") as HTMLInputElement
      addressInput.disabled=true;
      let birthDayInput = document.getElementById("BirthDay") as HTMLInputElement
      birthDayInput.disabled=true;
      this.crud.updateProfile('displayName',nameInput.value);
      this.crud.updateProfile('phoneNum',phoneInput.value);
      this.crud.updateProfile('address',addressInput.value);
      this.crud.updateProfile('birthDay',birthDayInput.value);
    }
  }


    async ngOnInit(): Promise<void> {
      if(!this.auth.isConnected()){
        this.router.navigate(['/home']);
      }
      this.af.user.subscribe(user=>{
        this.displayName = user.displayName;
        this.email = user.email;
      });
      //{key:{key:value,key:value,key:value,key:value}}
      this.reciptsIDs=this.db.list('/users/' + JSON.parse(sessionStorage.getItem('user')).uid + '/recipts').snapshotChanges();
      console.log(this.profile +"  init")
      let id =JSON.parse(sessionStorage.getItem('user')).uid;
      this.db.list('/users/' +id+ '/profile/').valueChanges().subscribe(details => {
        this.birthDay = String(details[1]);
        this.address = String(details[0]);
        this.phoneNum = String(details[4]);
    });
    }

  }
