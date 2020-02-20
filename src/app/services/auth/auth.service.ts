import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Credential } from './auth.model';
import { Router } from '@angular/router';
import { map, first, flatMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private router: Router) {
    }

    getCurrentUser() {
        return this.afAuth.user;
    }

    doLogin(value: Credential): Observable<firebase.User> {
        return from(this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)).pipe(
            first(),
            flatMap(() => this.getCurrentUser())
        );
    }

    async doLogout() {
        await this.afAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    async doForgetPassword(email: string) {
        return await this.afAuth.auth.sendPasswordResetEmail(email);
    }

    async doChangePassword(oldPassword: string, newPassword: string) {
        const user = await this.afAuth.user.pipe(first()).toPromise();
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPassword);
    }

}
