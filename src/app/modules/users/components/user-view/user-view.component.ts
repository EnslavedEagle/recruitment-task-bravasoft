import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '@app/interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { DeleteDialogComponent } from '../delete-dialog';
import { MatDialog, MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'bv-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit, OnDestroy {
  public userData: User;
  public randomNumber = Math.floor(Math.random() * 10000); // random number to refresh placeholders
  private _paramSub: Subscription;
  private _userSub: Subscription;
  private _userId: string;
  private _back: any;

  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._paramSub = this._route.params.subscribe((params) => {
      this._userId = params['userId'];
      this._userSub = this._userService.fetchUserDetails(this._userId)
        .subscribe((user) => this.userData = user);
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._userSub.unsubscribe();
  }

  delete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '320px',
      data: { userId: this.userData.Id, username: this.userData.Username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._userService.deleteUser(this._userId)
          .subscribe(() => {
            this._snackBar.open('User deleted!', null, { duration: 3000 });
            this._router.navigate(['../../list'], { relativeTo: this._route });
          });
      }
    });
  }

  back(): void {
    // TODO: Implement this: https://blog.hackages.io/our-solution-to-get-a-previous-route-with-angular-5-601c16621cf0
    // and make the back() redirect to proper thing in the past
  }

}
