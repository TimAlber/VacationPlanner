import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  docChanges,
  DocumentReference,
  fromDocRef
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import * as firebase from "firebase";
import { isDataSource } from "@angular/cdk/collections";
import { query } from "@angular/animations";
import {take} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
  vacdaystotal?: number;
  vacdaystaken?: number;
  partTime: boolean;
  lastYearTime: number;
}

@Injectable({
  providedIn: "root"
})
// This Service is used to get all kinds of different data from the firebase firestore database
export class VacPlansService {
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  val: number;

  constructor(private afs: AngularFirestore) {}
  addItem(studentData) {
    this.afs
      .collection("vacation-plans")
      .add(studentData)
      .then(docRef => {
        studentData.id = docRef ? (docRef as DocumentReference).id : "void";
        this.afs
          .collection("vacation-plans")
          .doc(studentData.id)
          .update(studentData);
      });
  }
  updateUser(useruid, taken) {
    this.afs
      .doc<User>("users/" + useruid)
      .valueChanges()
      .pipe(take(1))
      .subscribe(source => {
        source.vacdaystaken = taken;
        this.afs
          .collection("users")
          .doc(useruid)
          .update(source);
      });
  }

  deleteItem(key) {
    this.afs
      .collection("vacation-plans")
      .doc(key)
      .delete();
  }

  getItems() {
    // get items for overview table
    return this.afs
      .collection("vacation-plans", ref => ref.where("state", "==", "APPROVED"))
      .valueChanges();
  }
  getPendingItems() {
    // get items for Admin table
    return this.afs
      .collection("vacation-plans", ref => ref.where("state", "==", "PENDING"))
      .valueChanges();
  }
  getDeclinedItems() {
    // get items for stats tables // ref.where('state', '==', 'DECLINED')
    return this.afs
      .collection("vacation-plans", ref => ref.where("state", "==", "DECLINED"))
      .valueChanges();
  }

  getanotherUserSnap() {
    return this.afs.collection("vacation-plans").valueChanges();
  }
  getUsers() {
    return this.afs.collection("users").valueChanges();
  }
  getCertainUser(uid) {
    return this.afs.doc("users/" + uid).valueChanges();
  }
  getItem(id) {
    return this.afs
      .collection("vacation-plans")
      .doc(id)
      .valueChanges();
  }

  setapprove(key) {
    key.state = "APPROVED";
    this.afs
      .collection("vacation-plans")
      .doc(key.id)
      .update(key);
  }

  setdecline(key) {
    key.state = "DECLINED";
    this.afs
      .collection("vacation-plans")
      .doc(key.id)
      .update(key);
  }
}
