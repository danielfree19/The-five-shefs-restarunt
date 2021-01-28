import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})

export class AboutUsComponent implements OnInit {
  editorsInfo$:any;
  correct = false;

  isCorrect(){
     this.correct = this.pass==this.setPass;
  }

  values = '';
  onKey() { // without type info
      this.correct = this.pass == this.setPass;
  }

  pass;
  setPass = "Angular2021";
  constructor(db:AngularFireDatabase) {
    this.editorsInfo$= db.list('/editors').valueChanges();
  }

  ngOnInit(): void {
  }

}
