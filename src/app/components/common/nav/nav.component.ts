import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    public isAuthenticated: boolean;

    constructor(public auth: AuthService) {
        this.auth.getCurrentUser().subscribe(user => this.isAuthenticated = user ? true : false);
    }

    ngOnInit() {}

    async logout() {
        try {
            await this.auth.doLogout();
        } catch (err) {
            alert(`Error while Logging Out: ${err.message}`);
        }
    }
}
