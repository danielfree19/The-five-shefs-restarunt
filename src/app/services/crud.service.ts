import { Injectable, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';



@Injectable({
    providedIn: 'root'
})
export class CRUDService implements OnInit {
    user: any;
    users: any;
    reciptDB: any;
    reciptlist:any []=[] ;
    constructor(private db: AngularFireDatabase) {

    }

    // Create Student
    Addrecipt(cartItems, cash?, CreditCard?) {
        let date = new Date()
        this.reciptDB = this.db.object('/users/' + JSON.parse(sessionStorage.getItem('user')).uid + '/recipts/' + (date.getMonth() + 1) + "54535" + date.getMilliseconds());
        this.reciptDB.set({
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
        phoneNum:phoneNum,});
      }

    updateProfile( key,data){
      let id =JSON.parse(sessionStorage.getItem('user')).uid;
      this.user = this.db.object('/users/' +id+'/profile/');
      this.user.update({[key]:data});
      }
    //Fetch user profile
    GetProfile(){
      let profile:any[]=[];
      return this.user.valueChanges().subscribe(object=>{
        profile.push(object) ;
      });
      return profile
    }

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
