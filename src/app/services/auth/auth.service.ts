import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Credential } from './auth.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private currentUser: firebase.User;

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser ? true : false;
    }

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                this.currentUser = null;
                localStorage.setItem('user', null);
            }
        });
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
}
