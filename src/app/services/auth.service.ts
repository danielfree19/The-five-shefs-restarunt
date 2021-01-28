import { Router } from '@angular/router';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import {CRUDService} from '../services/crud.service';



@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user;
    errorMsg = "";
    constructor(
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public db: AngularFireDatabase,
        public crud:CRUDService,
        public router:Router
    ) {}
    connected: Boolean = false;


    // רישום משתמש בעזרת אימייל
    EmailSignup(username, email, password, repassword) {
        if (password == repassword) {
            this.afAuth.createUserWithEmailAndPassword(email, password).then((info) => {
                this.setUser(info['user'], username);
                this.UpdateDisplayName(username);
                this.crud.ceateProfile(email);
            }).catch((error) => {
                console.log(error);
            })

        }
        else {
            this.errorMsg = "password is incorrect retype the password";
        }
    }
    //under work
    async UpdateDisplayName(username) {
        let user = this.afAuth.currentUser;

        (await user).updateProfile({
            displayName: username
        })
    }
    //**********************התחברות בעזרת אימייל רשום
    EmailLogin(email, password) {
        this.afAuth.signInWithEmailAndPassword(email, password).then((info) => {
            this.setUser(info['user']);

            console.log(info['user']);

        }).catch((error) => {
            this.errorMsg = error;
        })
    }


    //******************************google auth**************************************
    /*ceateProfile(email,displayName?,birthDay?,address?,phoneNum?){
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
*/
    GoogleAuth() {
        return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }
    AuthLogin(provider) {
        this.afAuth.signInWithPopup(provider).then((result) => {
            this.setUser(result["user"], result["user"].displayName);
            if (result.additionalUserInfo.isNewUser)
                this.crud.ceateProfile(result.user.email, result["user"].displayName);

        }).catch((error) => {
            this.errorMsg = error;
        })
    }
    /******************************סיום החיבור של המשתמש***********************************************/
    setUser(info, username?) {
        this.UpdateDisplayName(username);

        this.UpdateDisplayName(username);

        this.user = new User(info.uid, info.email, info.photoURL, info.displayName);
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log(sessionStorage.getItem('user'))
        this.connected = true;
    }
    /********************************************************************************* */
    //בדיקה אם המשתמש היה מחובר *****************************************************
    checkIfConnected() {
        let uInf = JSON.parse(sessionStorage.getItem('user'));
        if (uInf != null) {
            this.connected = true;
            this.user = new User(uInf.uid, uInf.email, uInf.photoURL, uInf.displayName);
        }
    }
    /***************************************************************************************** */
    //מחזיר ערך בוליאני שהמשתמש נחשב כמחובר **********************************************
    isConnected() {
        return this.connected;
    }
    /***************************************************************************************** */
    //ניתוק משתמש מהמערכת *********************************************************************
    disconnect() {
        firebase.auth().signOut().then(() => {
            this.connected = false;
            sessionStorage.removeItem('user');
            this.router.navigate(['/home']);
        }).catch((error) => {
            this.errorMsg = error;
        });
    }
    /***************************************************************************************** */
    //מחזיר את הערך של השגיאה***************************
    getErrorMsg() {
        return this.errorMsg;
    }
}

