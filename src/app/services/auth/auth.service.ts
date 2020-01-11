import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Credential } from './auth.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private router: Router) {
    }

    getCurrentUser() {
        return this.afAuth.user;
    }

    async doGoogleLogin() {
        // const provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('profile');
        // provider.addScope('email');
        // await this.afAuth.auth.signInWithPopup(provider);
    }

    async doLogin(value: Credential) {
        await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
    }

    async doLogout() {
        await this.afAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    async doForgetPassword(email: string) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }
}
