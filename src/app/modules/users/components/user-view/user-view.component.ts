import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bv-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit {
  public userData: User;
  public randomNumber = Math.floor(Math.random() * 10000); // random number to refresh placeholders
  private _userId;
  private _paramSub: Subscription;
  private _userSub: Subscription;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._paramSub = this._route.params.subscribe((params) => {
      this._userSub = this._userService.fetchUserDetails(params['userId'])
        .subscribe((user) => this.userData = user);
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._userSub.unsubscribe();
  }

}
