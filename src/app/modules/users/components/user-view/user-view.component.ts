import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@app/interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { DeleteDialog } from '../delete-dialog';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'bv-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit {
  public userData: User;
  public randomNumber = Math.floor(Math.random() * 10000); // random number to refresh placeholders
  private _paramSub: Subscription;
  private _userSub: Subscription;
  private _userId: string;

  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._paramSub = this._route.params.subscribe((params) => {
      this._userId = params['userId'];
      this._userSub = this._userService.fetchUserDetails(this._userId)
        .subscribe((user) => {
          this.userData = user
        });
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._userSub.unsubscribe();
  }

  delete(): void {
    let dialogRef = this.dialog.open(DeleteDialog, {
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

}
