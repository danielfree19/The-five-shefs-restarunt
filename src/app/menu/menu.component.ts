import firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { CartOI } from './../app.component';
import { Component, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    Cart = CartOI;
    info;
    ui;
    constructor(public authService: AuthService) {

    }

    onclick() {
        this.info = JSON.parse(sessionStorage.getItem("cart"));
        console.log(this.info[0].name);
    }

    ngOnInit(): void {
    }
    remCookie() {
        sessionStorage.removeItem('cart');
        this.Cart.cart.splice(0);

    }
}
