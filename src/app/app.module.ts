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
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/views/registration-page/registration-page.component';
import { LoginPageComponent } from './components/views/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/views/forget-password-page/forget-password-page.component';
import { DoesNotExistPageComponent } from './components/views/does-not-exist-page/does-not-exist-page.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { OrganizationDashboardComponent } from './components/views/organization-dashboard/organization-dashboard.component';
import { InventoryPanelComponent } from './components/views/inventory-panel/inventory-panel.component';
import { TransactionPageComponent } from './components/views/transaction-page/transaction-page.component';
import { ItemsListingPageComponent } from './components/views/items-listing-page/items-listing-page.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { InnerGuard } from './services/auth/inner.guard';
import { UserManagementService } from './services/auth/uam.service';
import { UserOrganizationService } from './services/organization/user-organization.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventoryDetailOverlayComponent } from './components/views/inventory-detail-overlay/inventory-detail-overlay.component';

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
        InventoryDetailOverlayComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        NgbModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        InnerGuard,
        UserManagementService,
        UserOrganizationService
    ],
    bootstrap: [AppComponent],
    entryComponents: [ InventoryDetailOverlayComponent ],
})
export class AppModule {}
