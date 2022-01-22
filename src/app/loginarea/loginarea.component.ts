import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import "firebase/functions";

@Component({
  selector: 'app-loginarea',
  templateUrl: './loginarea.component.html',
  styleUrls: ['./loginarea.component.scss']

})
export class LoginareaComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {}

  // This Class is only here to load in auth so that auth functions can be called from the html
  ngOnInit() {}
}
