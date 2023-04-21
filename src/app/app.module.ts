import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Otras Importaciones
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
import { AuthService } from './services/auth.service';
//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AppSinginComponent } from './app-singin/app-singin.component';
import { AppSingupComponent } from './app-singup/app-singup.component';
import { AppPricingTableComponent } from './app-pricing-table/app-pricing-table.component';
import { AppPaymentConfirmationComponent } from './app-payment-confirmation/app-payment-confirmation.component';
import { CarouselOpenComponent } from './carousel-open/carousel-open.component';
import { BannerComponent } from './banner/banner.component';
import { LoaderComponent } from './loader/loader.component';


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
    AppSinginComponent,
    AppSingupComponent,
    AppPricingTableComponent,
    AppPaymentConfirmationComponent,
    CarouselOpenComponent,
    BannerComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule ,
    MatSelectModule ,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    RouterModule.forRoot([
      {path: '', component: AppInicioComponent },
      {path: 'DASHBOARDADMIN', component: AppAdminprofileComponent},
      {path: 'DASHBOARDUSER', component: AppUserprofileComponent},
      {path: 'BOOKDESCRIPTION', component: AppBookdescriptionComponent},
      {path: 'SIGNIN', component: AppSinginComponent},
      {path: 'SIGNUP/:plan/:url', component: AppSingupComponent},
      {path: 'PLAN', component: AppPricingTableComponent },
      {path: 'PAYMENTCONFIRMATION', component: AppPaymentConfirmationComponent}
    ]),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
