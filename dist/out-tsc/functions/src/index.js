import * as functions from 'firebase-functions';
export const sendApproveEmail = functions.https.onRequest((request, response) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey("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");
    // const msg = {
    //   to: 'tim@syqlo.com',
    //   from: 'test@sendgridtest.com',
    //   subject: 'Hope this works',
    //   text: 'Hope this works',
    //   html: '<strong>hope this works</strong>',
    // };
    const msg = {
        to: request.body.to || 'tim@syqlo.com',
        from: request.body.from || 'vacationapp@syqlo.com',
        subject: request.body.subject || 'Vacation was Approved',
        text: request.body.text || 'Your Vacation was Approved',
    };
    console.log('msg: ', msg);
    sgMail.send(msg)
        .then(() => {
        response.send('Mail Send');
    })
        .catch((error) => {
        response.send('Some Error occurred ' + error);
    });
});
//# sourceMappingURL=index.js.map