import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/views/registration-page/registration-page.component';
import { LoginPageComponent } from './components/views/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/views/forget-password-page/forget-password-page.component';
import { DoesNotExistPageComponent } from './components/views/does-not-exist-page/does-not-exist-page.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { OrganizationDashboardComponent } from './components/views/organization-dashboard/organization-dashboard.component';

import { AuthGuard } from './services/auth/auth.guard';
import { InnerGuard } from './services/auth/inner.guard';
import { InventoryPanelComponent } from './components/views/inventory-panel/inventory-panel.component';
import { TransactionPageComponent } from './components/views/transaction-page/transaction-page.component';
import { ItemsListingPageComponent } from './components/views/items-listing-page/items-listing-page.component';
import { ProductDetailPageComponent } from './components/views/product-detail-page/product-detail-page.component';

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
        path: 'organization/inventory/:pid',
        component: ProductDetailPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'organization/inventory',
        component: InventoryPanelComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'organization/transaction/new',
        component: TransactionPageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'organization/transaction/view/:txid',
        component: TransactionPageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    {
        path: 'organization/transaction/items/add',
        component: ItemsListingPageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
    },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component: DoesNotExistPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes/*, { useHash: true }*/)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
