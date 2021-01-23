import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStackOverflow, faGithub, faMedium, faDiscord, faWhatsapp, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AngularFireDatabase } from '@angular/fire/database';
import { CRUDService } from '../services/crud.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    errorMsg;//מיועד לזריקת הודעות שגיאה בזמן רישום והתחברות
    /*     בחירה של אמצאי התחברות רישום או התחברות למשתמש קיים    */
    flag = true;
    flagToggle() {
        if (this.flag) {
            this.flag = false;
        }
        else {
            this.flag = true;
        }
    }
    /***********************************************************************/
    constructor(public authService: AuthService, private library: FaIconLibrary, public db: AngularFireDatabase) {
        /*      icons from font awesome module    */
        library.addIcons(
            faStackOverflow,
            faGithub,
            faMedium,
            faDiscord,
            faWhatsapp,
            faGoogle,
            faFacebook
        );
        /********************************************/
        //checking if the user from the certain pc was connected previously via cookie
        authService.checkIfConnected();

    }
    //user register via email address
    register(Username, email, Pwd, rePwd) {
        this.authService.EmailSignup(Username, email, Pwd, rePwd);
    }
    //user login via email address
    async login(Username, Pwd) {
        this.authService.EmailLogin(Username, Pwd);

    }
    //user login via google provider
    async Glogin() {
        await this.authService.GoogleAuth();

    }

    displayname;
    ngOnInit(): void {

    }
}
