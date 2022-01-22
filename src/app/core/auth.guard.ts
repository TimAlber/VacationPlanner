import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { tap, map, take } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  // This canActivate function is used for the authguard and blocking of routes should the user not be logged in
  canActivate() {
    try {
      if (this.angularFireAuth.auth.currentUser.uid) {
        return true;
      } else {
        this.snackBar.open("Your have to log in first.", "Close", {
          duration: 4000
        });
        return false;
      }
    } catch {
      this.snackBar.open("Your have to log in first.", "Close", {
        duration: 4000
      });
      return false;
    }
  }
}
