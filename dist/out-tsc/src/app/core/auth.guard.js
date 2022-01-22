import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(auth, router, angularFireAuth, snackBar) {
        this.auth = auth;
        this.router = router;
        this.angularFireAuth = angularFireAuth;
        this.snackBar = snackBar;
    }
    canActivate() {
        if (this.angularFireAuth.auth.currentUser.uid) {
            return true;
        }
        else {
            this.snackBar.open('Your have to log in first.', 'Close', {
                duration: 4000,
            });
            return false;
        }
        /*    return this.auth.user.pipe(
            take(1),
              map(user => !!user),
              tap(loggedIn => {
                if (!loggedIn) {
                  console.log('access denied')
                  this.router.navigate(['']);
                }
              })
          );*/
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable()
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map