import { Component, Inject, OnInit } from '@angular/core';

import {  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare,faPhone } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium,faDiscord ,faWhatsapp,faFacebook} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faSquare, 
      faCheckSquare, 
      farSquare, 
      farCheckSquare, 
      faStackOverflow, 
      faGithub, 
      faMedium,
      faDiscord,
      faWhatsapp,
      faPhone,
      faFacebook
      );
  }
  
  ngOnInit(): void {
  }

}
