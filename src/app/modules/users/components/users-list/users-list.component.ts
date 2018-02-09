import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '@app/interfaces';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { of as observableOf } from 'rxjs/observable/of';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'bv-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  public displayedColumns = ['FirstName', 'LastName', 'Username', 'Email', 'Birthday', 'Options'];

  public resultsLength = 0;
  public isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._userService.fetchUserPage(this.paginator.pageIndex)
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
      ).subscribe(data => this.dataSource.data = data);
  }

  ngOnDestroy() {
  }

}
