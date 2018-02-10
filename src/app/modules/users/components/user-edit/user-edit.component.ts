import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '@app/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { RoutingStateService } from '@modules/shared/services';

@Component({
  selector: 'bv-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit, OnDestroy {
  public userForm: FormGroup;
  public userData: User;
  public formSent = false;
  private _userId = null;
  private _paramSub: Subscription = new Subscription();
  private _userSub: Subscription = new Subscription();
  private _submitSub: Subscription = new Subscription();
  private _previousRoute: string;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _routingState: RoutingStateService
  ) {
    this._routingState.loadRouting();
    this._previousRoute = this._routingState.getPreviousUrl();
  }

  ngOnInit() {
    this._paramSub = this._route.params.subscribe((params) => {
      if (params['userId']) {
        this._userSub = this._userService.fetchUserDetails(params['userId'])
          .subscribe((user) => {
            this._userId = user.Id;
            this.userData = user;
            this.initForm();
          });
      } else {
        this.initForm();
      }
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._userSub.unsubscribe();
    this._submitSub.unsubscribe();
  }

  initForm() {
    if (this._userId) {
      this.userForm = this._fb.group({
        FirstName: [this.userData.FirstName, Validators.required],
        LastName: [this.userData.LastName, Validators.required],
        Username: [this.userData.Username, [Validators.required, Validators.pattern(new RegExp('^[A-Za-z0-9]{3,}$'))]],
        Email: [this.userData.Email, [Validators.required, Validators.email]],
        Birthday: [this.userData.Birthday, [Validators.required]]
      });
    } else {
      this.userForm = this._fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Username: ['', [Validators.required, Validators.pattern(new RegExp('^[A-Za-z0-9]{3,}$'))]],
        Email: ['', [Validators.required, Validators.email]],
        Birthday: ['', [Validators.required]]
      });
    }
  }

  saveUser() {
    this.formSent = true;
    const payload = this.userForm.value;
    if (this._userId) {
      this._submitSub = this._userService.updateUserDetails(this.userData.Id, payload)
        .subscribe(() => {
          this._snackBar.open('User saved!', null, { duration: 3000 });
          this.redirect();
        });
    } else {
      this._submitSub = this._userService.createUser(payload)
        .subscribe(() => {
          this._snackBar.open('User created!', null, { duration: 3000 });
          this.redirect();
        });
    }
  }

  public redirect(): void {
    if (!this._userId) {
      this._router.navigate(['../list'], { relativeTo: this._route });
    } else {
      if (/^\/users\/list$/.test(this._previousRoute)) {
        this._router.navigate(['../../list'], { relativeTo: this._route });
      } else {
        this._router.navigate(['../../view/', this._userId], { relativeTo: this._route });
      }
    }
  }
}
