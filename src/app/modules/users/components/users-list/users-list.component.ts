import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '@app/interfaces';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { of as observableOf } from 'rxjs/observable/of';
import { UserService } from '../../services/user.service';
import { DeleteDialogComponent } from '@modules/shared/components/delete-dialog';

@Component({
  selector: 'bv-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  public displayedColumns = ['FirstName', 'LastName', 'Options'];

  public resultsLength = 0;
  public isLoadingResults = true;

  private _paginatiorSub: Subscription;
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetch();
  }

  ngOnDestroy() {
    this._paginatiorSub.unsubscribe();
  }

  fetch() {
    this._paginatiorSub = this._paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._userService.fetchUserPage(this._paginator.pageIndex);
        }),
        map((result) => {
          this.isLoadingResults = false;
          this.resultsLength = result.Metadata.Total;
          return result.Data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe((data) => this.dataSource.data = data);
  }

  delete(userId: string, username: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '380px',
      data: {
        confirmationHeading: 'Are you sure?',
        confirmationText: `Do you really want to delete user <strong>${username}</strong>?`,
        userId, username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._userService.deleteUser(userId)
          .subscribe(() => {
            this._snackBar.open('User deleted!', null, { duration: 3000 });
            this.fetch();
          });
      }
    });
  }

}
