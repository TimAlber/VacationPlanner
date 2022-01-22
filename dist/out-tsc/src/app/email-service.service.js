import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import * as sgMail from '@sendgrid/mail';
// import * as SendGrid from 'sendgrid';
//
// export class SendGridMail extends SendGrid.mail.Mail {}
// export class SendGridEmail extends SendGrid.mail.Email {}
// export class SendGridContent extends SendGrid.mail.Content {}
let EmailServiceService = class EmailServiceService {
    constructor(http) {
        this.http = http;
        // this.sendGrid = SendGrid('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');
    }
    sendEmail(request) {
        const url = 'https://us-central1-vacationplanner-4f6f3.cloudfunctions.net/sendApproveEmail';
        const params = new URLSearchParams();
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        params.set('to', request.to);
        params.set('from', request.from);
        params.set('subject', request.subject);
        params.set('content', request.text);
        return this.http.post(url, params, headers)
            .toPromise()
            .then(res => {
            console.log('res: ', res);
        })
            .catch(err => {
            console.log('err: ', err);
        });
    }
};
EmailServiceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], EmailServiceService);
export { EmailServiceService };
//# sourceMappingURL=email-service.service.js.map