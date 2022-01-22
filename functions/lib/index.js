"use strict";
exports.__esModule = true;

const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

exports.sendApproveEmail = functions.https.onCall((request, response) => {
  console.log("request.body: ", request);
  const msg = {
    to: request.to || "tim@syqlo.com",
    from: request.from || "vacationapp@syqlo.com",
    subject: request.subject || "Error: Data was missing.",
    html:
      request.html ||
      "Error: Data was missing. Please notify an Admin about this."
  };

  console.log("mail-content: ", msg);
  return sgMail
    .send(msg)
    .then(() => {
      console.log("Mail Send");
    })
    .catch(error => {
      console.log("Some Error occurred " + error);
    });
});

exports.newyear = functions.pubsub
  .schedule("0 0 31 12 *")
  .timeZone("America/New_York")
  .onRun(context => {
    const admin = require("firebase-admin");
    var serviceAccount = require("../vacationplanner-4f6f3-firebase-adminsdk-vjaw7-a162b78968.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://vacationplanner-4f6f3.firebaseio.com"
    });

    console.log("New Year Called!");
    var usersRef = admin.firestore().collection("users");
    var allusers = usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          let v = 0;
          v =
            Number(user.data().vacdaystotal) - Number(user.data().vacdaystaken);
          let document = admin.firestore().doc(`/users/${user.id}`);
          document.set({
            displayName: user.data().displayName,
            email: user.data().email,
            lastYearTime: v,
            partTime: user.data().partTime,
            role: user.data().role,
            uid: user.data().uid,
            vacdaystaken: 0,
            vacdaystotal: user.data().vacdaystotal
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents: ", err);
      });
  });

exports.endemarz = functions.pubsub
  .schedule("0 0 31 03 *")
  .timeZone("America/New_York")
  .onRun(context => {
    const admin = require("firebase-admin");
    var serviceAccount = require("../vacationplanner-4f6f3-firebase-adminsdk-vjaw7-a162b78968.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://vacationplanner-4f6f3.firebaseio.com"
    });

    console.log("Ende März!");
    var usersRef = admin.firestore().collection("users");
    var allusers = usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          let document = admin.firestore().doc(`/users/${user.id}`);
          document.set({
            displayName: user.data().displayName,
            email: user.data().email,
            lastYearTime: 0,
            partTime: user.data().partTime,
            role: user.data().role,
            uid: user.data().uid,
            vacdaystaken: user.data().vacdaystaken,
            vacdaystotal: user.data().vacdaystotal
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  });
