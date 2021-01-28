import { Injectable, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})

export class CRUDService implements OnInit {
    displayName;
    email;
    birthDay;
    address;
    phoneNum;
    user: any;
    users: any;
    reciptDB: any;
    reciptlist:any []=[] ;
    profile:any[]=[];
    profilePath;
    constructor(private db: AngularFireDatabase) {

    }

    // Create Student
    Addrecipt(cartItems,id, cash, CreditCard) {
        let date = new Date()
        this.reciptDB = this.db.object('/users/' + JSON.parse(sessionStorage.getItem('user')).uid + '/recipts/' + id);
        this.reciptDB.set({
            //{key:value,key:value}
            thisdate: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            cartItems: cartItems,
            payCash: cash,
            payCredit: CreditCard,
        })
    }

    GetReciptsList() {
      this.reciptDB = this.db.list('/users/' + JSON.parse(sessionStorage.getItem('user')).uid + '/recipts')
      this.reciptDB.valueChanges().subscribe(recipts=>{
          for(let item of recipts){
              this.reciptlist.push(item)}
          });
      return this.reciptlist;
    }

    ceateProfile(email,displayName?,birthDay?,address?,phoneNum?){
      let id =JSON.parse(sessionStorage.getItem('user')).uid;
      this.user = this.db.object('/users/' +id+ '/profile/');
      if(!displayName){
        displayName = ''
      };
      if(!birthDay){
        birthDay = ''
      };
      if(!address){
        address = ''
      };
      if(!phoneNum){
        phoneNum = ''
      };
      this.user.set({
        email:email,
        displayName:displayName,
        birthDay:birthDay,
        address:address,
        phoneNum:phoneNum,
      });
      }

    updateProfile(key,data){
      let id =JSON.parse(sessionStorage.getItem('user')).uid;
      this.user = this.db.object('/users/' +id+'/profile/');
      this.user.update({[key]:data});
      }
    //Fetch user profile
    /*
     // Update Student Object
     UpdateStudent(student: Student) {
       this.studentRef.update({
         firstName: student.firstName,
         lastName: student.lastName,
         email: student.email,
         mobileNumber: student.mobileNumber
       })
     }

     // Delete Student Object
     DeleteStudent(id: string) {
       this.studentRef = this.db.object('students-list/'+id);
       this.studentRef.remove();
     }
    */

    ngOnInit(): void {

    }
}
