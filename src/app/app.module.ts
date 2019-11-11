import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavComponent } from './components/common/nav/nav.component';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/views/registration-page/registration-page.component';
import { LoginPageComponent } from './components/views/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/views/forget-password-page/forget-password-page.component';
import { DoesNotExistPageComponent } from './components/views/does-not-exist-page/does-not-exist-page.component';
import { SampleProtectedViewComponent } from './components/views/sample-protected-view/sample-protected-view.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    LandingPageComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    ForgetPasswordPageComponent,
    DoesNotExistPageComponent,
    SampleProtectedViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
