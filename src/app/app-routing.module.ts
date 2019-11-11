import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/views/registration-page/registration-page.component';
import { LoginPageComponent } from './components/views/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/views/forget-password-page/forget-password-page.component';
import { DoesNotExistPageComponent } from './components/views/does-not-exist-page/does-not-exist-page.component';
import { SampleProtectedViewComponent } from './components/views/sample-protected-view/sample-protected-view.component';

import {AuthGuard} from './services/auth/auth.guard';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginPageComponent, pathMatch: 'full'},
  {path: 'register', component: RegistrationPageComponent, pathMatch: 'full'},
  {path: 'forget', component: ForgetPasswordPageComponent, pathMatch: 'full'},
  {path: 'protectedSample', component: SampleProtectedViewComponent, canActivate: [AuthGuard]},
  {path: '**', component: DoesNotExistPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
