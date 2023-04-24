import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  title = 'ServicioBibliotecaOnline';

  constructor(private translocoService: TranslocoService, private cookieService: CookieService) {}

  ngOnInit() {
    const selectedLanguage = this.cookieService.get('selectedLanguage'); // Lee el idioma seleccionado de la cookie
    if (selectedLanguage) {
      this.translocoService.setActiveLang(selectedLanguage); // Establece el idioma seleccionado como idioma activo
    }
  }
}
