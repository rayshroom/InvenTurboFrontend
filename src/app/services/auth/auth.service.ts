import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Credential } from './auth.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private currentUser: firebase.User;

    getCurrentUser() {
        return this.currentUser;
    }

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
            } else {
                this.currentUser = null;
            }
        });
    }

    async doGoogleLogin() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            return await this.afAuth.auth.signInWithPopup(provider);
        } catch(err) {
            return err;
        }
    }

    async doLogin(value: Credential) {
        try {
            await firebase.auth().signInWithEmailAndPassword(value.email, value.password);
        } catch(err) {
            return err;
        }
    }

    doLogout() {

    }
}
