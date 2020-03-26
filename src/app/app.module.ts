import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
import { InventoryAdjustmentPaneComponent } from './components/views/product-detail-page/inventory-adjustment-pane/inventory-adjustment-pane.component';
import { UnverifiedEmailPageComponent } from './components/views/unverified-email-page/unverified-email-page.component';
import { AccountSettingPageComponent } from './components/views/account-setting-page/account-setting-page.component';
import { ProfileSummaryPaneComponent } from './components/views/account-setting-page/profile-summary-pane/profile-summary-pane.component';
import { ProfileDetailPaneComponent } from './components/views/account-setting-page/profile-detail-pane/profile-detail-pane.component';
import { CredentialPaneComponent } from './components/views/account-setting-page/credential-pane/credential-pane.component';
import { UploadFileComponent } from './components/views/upload-file/upload-file.component';
import { AddProductStockPageComponent } from './components/views/add-product-stock-page/add-product-stock-page.component';
import { AddExistingProductPaneComponent } from './components/views/add-product-stock-page/add-existing-product-pane/add-existing-product-pane.component';
import { ProductItemCardComponent } from './components/views/add-product-stock-page/add-existing-product-pane/product-item-card/product-item-card.component';
import { CreateNewProductPaneComponent } from './components/views/add-product-stock-page/create-new-product-pane/create-new-product-pane.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorChromeModule } from 'ngx-color/chrome';
import { GoogleMapsModule } from '@angular/google-maps';
import { InventoryDetailOverlayComponent } from './components/views/inventory-detail-overlay/inventory-detail-overlay.component';
import { PersonalRegistrationPaneComponent } from './components/views/registration-page/personal-registration-pane/personal-registration-pane.component';
import { OrganizationActivationPaneComponent } from './components/views/registration-page/organization-activation-pane/organization-activation-pane.component';
import { CreateOrganizationPageComponent } from './components/views/create-organization-page/create-organization-page.component';
import { LocationManagementPageComponent } from './components/views/location-management-page/location-management-page.component';
import { PersonnelManagementPageComponent } from './components/views/personnel-management-page/personnel-management-page.component';
import { LocationListPaneComponent } from './components/views/location-management-page/location-list-pane/location-list-pane.component';
import { LocationListItemComponent } from './components/views/location-management-page/location-list-pane/location-list-item/location-list-item.component';
import { LocationMapComponent } from './components/views/location-management-page/location-map/location-map.component';
import { FontAwesomeIconWrapperComponent } from './components/common/font-awesome-icon-wrapper/font-awesome-icon-wrapper.component';

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
        InventoryAdjustmentPaneComponent,
        UnverifiedEmailPageComponent,
        AccountSettingPageComponent,
        ProfileSummaryPaneComponent,
        ProfileDetailPaneComponent,
        CredentialPaneComponent,
        UploadFileComponent,
        AddProductStockPageComponent,
        AddExistingProductPaneComponent,
        ProductItemCardComponent,
        CreateNewProductPaneComponent,
        InventoryDetailOverlayComponent,
        PersonalRegistrationPaneComponent,
        OrganizationActivationPaneComponent,
        CreateOrganizationPageComponent,
        LocationManagementPageComponent,
        PersonnelManagementPageComponent,
        LocationListPaneComponent,
        LocationListItemComponent,
        LocationMapComponent,
        FontAwesomeIconWrapperComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        ColorChromeModule,
        GoogleMapsModule,
        NgbModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        AuthVerifyGuard,
        LoggedInGuard,
        UserManagementService,
        UserOrganizationService
    ],
    bootstrap: [AppComponent],
    entryComponents: [ InventoryDetailOverlayComponent ],
})
export class AppModule {}
