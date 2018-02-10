import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '@app/interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { DeleteDialogComponent } from '@modules/shared/components/delete-dialog';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RoutingStateService } from '@modules/shared/services';

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
    private _snackBar: MatSnackBar,
    private _routingState: RoutingStateService
  ) {
    _routingState.loadRouting();
  }

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
      width: '380px',
      data: {
        confirmationHeading: 'Are you sure?',
        confirmationText: `Do you really want to delete User ${this.userData.Username}?`,
        userId: this.userData.Id,
        username: this.userData.Username
      }
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
  }

}
