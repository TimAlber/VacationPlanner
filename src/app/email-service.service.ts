import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  private sendGrid;

  constructor() {}
  sendDiffMail(request) {
    const addMessage = firebase.functions().httpsCallable('sendApproveEmail');
    addMessage({
      to: request.to,
      from: request.from,
      subject: request.subject,
      html: request.html
    }).then(result => {
    });
  }
}
