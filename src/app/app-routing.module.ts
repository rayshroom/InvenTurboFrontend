import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/views/registration-page/registration-page.component';
import { LoginPageComponent } from './components/views/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/views/forget-password-page/forget-password-page.component';
import { DoesNotExistPageComponent } from './components/views/does-not-exist-page/does-not-exist-page.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { OrganizationDashboardComponent } from './components/views/organization-dashboard/organization-dashboard.component';
import { UploadFileComponent } from './components/views/upload-file/upload-file.component';

import { AuthGuard } from './services/auth/auth.guard';
import { InventoryPanelComponent } from './components/views/inventory-panel/inventory-panel.component';
import { TransactionPageComponent } from './components/views/transaction-page/transaction-page.component';
import { ItemsListingPageComponent } from './components/views/items-listing-page/items-listing-page.component';
import { ProductDetailPageComponent } from './components/views/product-detail-page/product-detail-page.component';
import { UnverifiedEmailPageComponent } from './components/views/unverified-email-page/unverified-email-page.component';
import { AuthVerifyGuard } from './services/auth/auth-verify.guard';
import { LoggedInGuard } from './services/auth/logged-in.guard';
import { EmailVerifiedGuard } from './services/auth/email-verified.guard';
import { AccountSettingPageComponent } from './components/views/account-setting-page/account-setting-page.component';
import { AddProductStockPageComponent } from './components/views/add-product-stock-page/add-product-stock-page.component';
import { CreateOrganizationPageComponent } from './components/views/create-organization-page/create-organization-page.component';
import { LocationManagementPageComponent } from './components/views/location-management-page/location-management-page.component';
import { PersonnelManagementPageComponent } from './components/views/personnel-management-page/personnel-management-page.component';
import { OrganizationGuard } from './services/organization/organization.guard';
import { OrganizationRoleGuard } from './services/organization/organization-role.guard';

const routes: Routes = [
    // DEV ROUTES STARTS
    {
        path: 'dev/upload',
        component: UploadFileComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard]
    },
    // DEV ROUTES ENDS

    { path: 'landing', component: LandingPageComponent, pathMatch: 'full' },
    {
        path: 'login',
        component: LoginPageComponent,
        pathMatch: 'full',
        canActivate: [LoggedInGuard]
    },
    {
        path: 'register',
        component: RegistrationPageComponent,
        pathMatch: 'full',
        canActivate: [LoggedInGuard]
    },
    {
        path: 'forget',
        component: ForgetPasswordPageComponent,
        pathMatch: 'full',
        canActivate: [LoggedInGuard]
    },
    {
        path: 'account',
        component: AccountSettingPageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard]
    },
    {
        path: 'organization',
        component: OrganizationDashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard, OrganizationGuard]
    },
    {
        path: 'organization/create',
        component: CreateOrganizationPageComponent,
        pathMatch: 'full',
    },
    {
        path: 'organization/inventory/add-product',
        component: AddProductStockPageComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard, OrganizationGuard]
    },
    {
        path: 'organization/inventory/:pid',
        component: ProductDetailPageComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard, OrganizationGuard]
    },
    {
        path: 'organization/inventory',
        component: InventoryPanelComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard, OrganizationGuard]
    },
    {
        path: 'organization/location',
        component: LocationManagementPageComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard, OrganizationGuard, OrganizationRoleGuard],
        data: { requiredClaims: ['isManager'] }
    },
    {
        path: 'organization/personnel',
        component: PersonnelManagementPageComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard, OrganizationGuard, OrganizationRoleGuard],
        data: { requiredClaims: ['isManager'] }
    },
    {
        path: 'organization/transaction/new',
        component: TransactionPageComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard, OrganizationGuard]
    },
    {
        path: 'organization/transaction/view/:txid',
        component: TransactionPageComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard]
    },
    {
        path: 'organization/transaction/items/add/:oid',
        component: ItemsListingPageComponent,
        pathMatch: 'full',
        canActivate: [AuthVerifyGuard]
    },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    {
        path: 'welcome',
        component: UnverifiedEmailPageComponent,
        canActivate: [EmailVerifiedGuard]
    },
    { path: 'notfound', component: DoesNotExistPageComponent },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes /*, { useHash: true }*/)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
