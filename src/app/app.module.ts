import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Otras Importaciones
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavegadorComponent } from './navegador/navegador.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { AsideComponent } from './aside/aside.component';
import { AppUserprofileComponent } from './app-userprofile/app-userprofile.component';
import { AppAdminprofileComponent } from './app-adminprofile/app-adminprofile.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppInicioComponent } from './app-inicio/app-inicio.component';
import { AppBookdescriptionComponent } from './app-bookdescription/app-bookdescription.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    FooterComponent,
    CardComponent,
    AsideComponent,
    AppUserprofileComponent,
    AppAdminprofileComponent,
    AppInicioComponent,
    AppBookdescriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    RouterModule.forRoot([
      {path: 'INICIO', component: AppInicioComponent },
      {path: 'DASHBOARDADMIN', component: AppAdminprofileComponent},
      {path: 'DASHBOARDUSER', component: AppUserprofileComponent},
      {path: 'BOOKDESCRIPTION', component: AppBookdescriptionComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
