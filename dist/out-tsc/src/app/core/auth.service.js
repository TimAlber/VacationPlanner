import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
let AuthService = class AuthService {
    constructor(afAuth, afs, router) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState.pipe(switchMap(user => {
            if (user) {
                return this.afs.doc(`users/${user.uid}`).valueChanges();
            }
            else {
                return of(null);
            }
        }));
    }
    get theUser() {
        return null;
    }
    googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }
    oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
            this.updateUserData(credential.user);
        });
    }
    updateUserData(user) {
        // Sets user data to firestore on login
        const userRef = this.afs.doc(`users/${user.uid}`);
        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: 'ADMIN',
            vacdaystotal: 24,
            vacdaystaken: 0,
        };
        return userRef.set(data, { merge: true });
    }
    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['']);
        });
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
export class AlwaysAuthGuard {
    constructor(angularFireAuth, snackBar, afs) {
        this.angularFireAuth = angularFireAuth;
        this.snackBar = snackBar;
        this.afs = afs;
        this.result = true;
    }
    canActivate() {
        this.itemDoc = this.afs.doc('users/' + this.angularFireAuth.auth.currentUser.uid);
        this.item = this.itemDoc.valueChanges();
        this.item.subscribe(source => {
            if (source.role === 'ADMIN') {
                console.log('!!!!!!Your an Admin !!!!!!!!!');
                this.result = true;
            }
            else {
                this.snackBar.open('Your are not an Admin so you cant go to this area.', 'Close', {
                    duration: 4000,
                });
                this.result = false;
            }
        });
        return this.result;
    }
}
//# sourceMappingURL=auth.service.js.map