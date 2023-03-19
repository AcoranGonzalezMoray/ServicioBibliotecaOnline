import {Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {
  constructor(public authService: AuthService) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 100) {
        console.log('scroll');
        (<HTMLInputElement>document.getElementById("navbar")).classList.add('nav__black');
        (<HTMLInputElement>document.getElementById("navbar")).classList.add('navbar-brand_');
        (<HTMLInputElement>document.getElementById("navbar-brand")).classList.add('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-1")).classList.add('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-2")).classList.add('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-3")).classList.add('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-4")).classList.add('navbar-brand_');
        (<HTMLInputElement>document.getElementById("menu-log-icon")).classList.add('navbar-brand_');
      } else {
        (<HTMLInputElement>document.getElementById("navbar")).classList.remove('nav__black');
        (<HTMLInputElement>document.getElementById("navbar")).classList.remove('navbar-brand_');
        (<HTMLInputElement>document.getElementById("navbar-brand")).classList.remove('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-1")).classList.remove('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-2")).classList.remove('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-3")).classList.remove('navbar-brand_');
        (<HTMLInputElement>document.getElementById("item-4")).classList.remove('navbar-brand_');
        (<HTMLInputElement>document.getElementById("menu-log-icon")).classList.remove('navbar-brand_');
      }
      
    });
 }

  ngOnInit() {
    if(sessionStorage.getItem('user')){
      (<HTMLInputElement>document.querySelector('#menu-log')).style.display = 'flex';
      (<HTMLInputElement>document.getElementById("menu-no-log")).style.display = 'none';
    }else{
      (<HTMLInputElement>document.querySelector('#menu-log')).style.display = 'none';
      (<HTMLInputElement>document.getElementById("menu-no-log")).style.display = 'flex';
    }
  }
}

