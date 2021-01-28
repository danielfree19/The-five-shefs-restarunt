import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-cartdrop',
  templateUrl: './cartdrop.component.html',
  styleUrls: ['../menu/menu.component.css']
})
export class CartdropComponent implements OnInit {




  constructor(public MenuComponent:MenuComponent) { }

  ngOnInit(): void {
  }

}
