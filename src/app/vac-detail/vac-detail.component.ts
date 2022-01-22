import { Component, OnInit } from '@angular/core';
import {map, take} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VacPlansService } from '../vac-plans.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vac-detail',
  templateUrl: './vac-detail.component.html',
  styleUrls: ['./vac-detail.component.scss']
})
// This is a detail view of one vacation plan
export class VacDetailComponent implements OnInit {
  state$: Observable<object>;
  globalid;
  itemData;
  userid;
  usersource;
  userData;
  displayItemData;

  constructor(
    public activatedRoute: ActivatedRoute,
    private student: VacPlansService,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Takes the Vacation ID that passed from the component before and use it to retreve all the detail of this vacation plan
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    this.state$.subscribe(vid => {
      // @ts-ignore
      // @ts-ignore
      this.globalid = vid.vid;
      // @ts-ignore

      this.itemData = this.student.getItem(this.globalid);
      this.itemData.pipe(take(1)).subscribe(source => {
        this.displayItemData = source;
      });
    });

    this.userData = this.student.getCertainUser(
      this.angularFireAuth.auth.currentUser.uid
    );
    this.userData.pipe(take(1)).subscribe(usersource => {
      this.usersource = usersource;
    });
  }
// Delete a Vacation Plan. This is only possible for Admins
//   deleteVac() {
//     this.student.deleteItem(this.globalid);
//     this.router.navigate(['overview']);
//     this.snackBar.open(
//       'The Vacation Plan has been deleted successfully.',
//       'Close',
//       { duration: 3000 }
//     );
//   }
}
