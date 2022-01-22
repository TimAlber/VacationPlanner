import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let VacPlansService = class VacPlansService {
    constructor(afs) {
        this.afs = afs;
    }
    addItem(studentData) {
        this.afs.collection('vacation-plans').add(studentData).then(docRef => {
            console.log((docRef) ? docRef.id : 'void'); // docRef of type void | DocumentReference
            studentData.id = (docRef) ? docRef.id : 'void';
            console.log(studentData);
            this.afs.collection('vacation-plans').doc(studentData.id).update(studentData);
        });
    }
    updateUser(useruid, taken) {
        // console.log('Talken: ', taken);
        this.afs.doc('users/' + useruid).valueChanges().subscribe(source => {
            source.vacdaystaken = taken;
            this.afs.collection('users').doc(useruid).update(source);
        });
    }
    deleteItem(key) {
        this.afs.collection('vacation-plans').doc(key).delete();
    }
    getItems() {
        return this.afs.collection('vacation-plans', ref => ref.where('state', '==', 'APPROVED')).valueChanges();
    }
    getPendingItems() {
        return this.afs.collection('vacation-plans', ref => ref.where('state', '==', 'PENDING')).valueChanges();
    }
    getDeclinedItems() {
        return this.afs.collection('vacation-plans', ref => ref.where('state', '==', 'DECLINED')).valueChanges();
    }
    getUsers() {
        return this.afs.collection('users').valueChanges();
    }
    getCertainUser(uid) {
        return this.afs.doc('users/' + uid).valueChanges();
        // return this.afs.collection('users').doc(uid).valueChanges();
    }
    setapprove(key) {
        key.state = 'APPROVED';
        this.afs.collection('vacation-plans').doc(key.id).update(key);
    }
    setdecline(key) {
        key.state = 'DECLINED';
        this.afs.collection('vacation-plans').doc(key.id).update(key);
    }
};
VacPlansService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], VacPlansService);
export { VacPlansService };
//# sourceMappingURL=vac-plans.service.js.map