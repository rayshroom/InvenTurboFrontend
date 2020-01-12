import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavComponent } from './components/common/nav/nav.component';
import { LoadingIconComponent } from './components/common/loading-icon/loading-icon.component';
import { InventoryItemCardComponent } from './components/common/inventory-item-card/inventory-item-card.component';

import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/views/registration-page/registration-page.component';
import { LoginPageComponent } from './components/views/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/views/forget-password-page/forget-password-page.component';
import { DoesNotExistPageComponent } from './components/views/does-not-exist-page/does-not-exist-page.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { UserProfilePaneComponent } from './components/views/dashboard/user-profile-pane/user-profile-pane.component';
import { OrganizationListPaneComponent } from './components/views/dashboard/organization-select-pane/organization-select-pane.component';
import { ActivityFeedPaneComponent } from './components/views/dashboard/activity-feed-pane/activity-feed-pane.component';
import { OrganizationDashboardComponent } from './components/views/organization-dashboard/organization-dashboard.component';
import { InventoryPanelComponent } from './components/views/inventory-panel/inventory-panel.component';
import { TransactionPageComponent } from './components/views/transaction-page/transaction-page.component';
import { ItemsListingPageComponent } from './components/views/items-listing-page/items-listing-page.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthVerifyGuard } from './services/auth/auth-verify.guard';
import { LoggedInGuard } from './services/auth/logged-in.guard';
import { UserManagementService } from './services/auth/uam.service';
import { UserOrganizationService } from './services/organization/user-organization.service';
import { ProductDetailPageComponent } from './components/views/product-detail-page/product-detail-page.component';
import { InventoryPanelHeaderComponent } from './components/common/inventory-panel-header/inventory-panel-header.component';
import { ProductDetailPaneComponent } from './components/views/product-detail-page/product-detail-pane/product-detail-pane.component';
import { CornerEditButtonComponent } from './components/common/corner-edit-button/corner-edit-button.component';
import { InventoryAdjustmentPaneComponent } from './components/views/product-detail-page/inventory-adjustment-pane/inventory-adjustment-pane.component';
import { UnverifiedEmailPageComponent } from './components/views/unverified-email-page/unverified-email-page.component';
import { AccountSettingPageComponent } from './components/views/account-setting-page/account-setting-page.component';
import { ProfileSummaryPaneComponent } from './components/views/account-setting-page/profile-summary-pane/profile-summary-pane.component';
import { ProfileDetailPaneComponent } from './components/views/account-setting-page/profile-detail-pane/profile-detail-pane.component';
import { CredentialPaneComponent } from './components/views/account-setting-page/credential-pane/credential-pane.component';

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
        DashboardComponent,
        OrganizationDashboardComponent,
        InventoryPanelComponent,
        TransactionPageComponent,
        ItemsListingPageComponent,
        LoadingIconComponent,
        UserProfilePaneComponent,
        OrganizationListPaneComponent,
        ActivityFeedPaneComponent,
        InventoryItemCardComponent,
        ProductDetailPageComponent,
        InventoryPanelHeaderComponent,
        ProductDetailPaneComponent,
        CornerEditButtonComponent,
        InventoryAdjustmentPaneComponent,
        UnverifiedEmailPageComponent,
        AccountSettingPageComponent,
        ProfileSummaryPaneComponent,
        ProfileDetailPaneComponent,
        CredentialPaneComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        AuthVerifyGuard,
        LoggedInGuard,
        UserManagementService,
        UserOrganizationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
