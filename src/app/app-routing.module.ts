import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/views/registration-page/registration-page.component';
import { LoginPageComponent } from './components/views/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/views/forget-password-page/forget-password-page.component';
import { DoesNotExistPageComponent } from './components/views/does-not-exist-page/does-not-exist-page.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { OrganizationDashboardComponent } from './components/views/organization-dashboard/organization-dashboard.component';
import { InventoryPageComponent } from './components/views/inventory-page/inventory-page.component';

import { AuthGuard } from './services/auth/auth.guard';
import { InnerGuard } from './services/auth/inner.guard';

const routes: Routes = [
    { path: 'landing', component: LandingPageComponent, pathMatch: 'full' },
    {
        path: 'login',
        component: LoginPageComponent,
        pathMatch: 'full',
        canActivate: [InnerGuard]
    },
    {
        path: 'register',
        component: RegistrationPageComponent,
        pathMatch: 'full',
        canActivate: [InnerGuard]
    },
    {
        path: 'forget',
        component: ForgetPasswordPageComponent,
        pathMatch: 'full',
        canActivate: [InnerGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'organization',
        component: OrganizationDashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'inventory',
        component: InventoryPageComponent,
        pathMatch: 'full'
        //canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component: DoesNotExistPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes/*, { useHash: true }*/)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
