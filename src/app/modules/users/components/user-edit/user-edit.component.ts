import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '@app/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { relative } from 'path';

@Component({
  selector: 'bv-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {
  public userForm: FormGroup;
  public userData: User;
  private _paramSub: Subscription = new Subscription();
  private _userSub: Subscription = new Subscription();
  private _submitSub: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._paramSub = this._route.params.subscribe((params) => {
      this._userSub = this._userService.fetchUserDetails(params['userId'])
        .subscribe((user) => {
          this.userData = user;
          this.initForm();
        });
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._userSub.unsubscribe();
    this._submitSub.unsubscribe();
  }

  initForm() {
    this.userForm = this._fb.group({
      FirstName: [this.userData.FirstName || '', Validators.required],
      LastName: [this.userData.LastName || '', Validators.required],
      Username: [this.userData.Username || '', [Validators.required, Validators.pattern(new RegExp('^[A-Za-z0-9]{3,}$'))]],
      Email: [this.userData.Email || '', [Validators.required, Validators.email]],
      Birthday: [this.userData.Birthday || '', [Validators.required]]
    });
  }

  saveUser() {
    const data = this.userForm.value;
    this._submitSub = this._userService.updateUserDetails(this.userData.Id, data)
      .subscribe(() => {
        this._snackBar.open('User saved!', null, { duration: 3000 });
        setTimeout(() => {
          this._router.navigate(['../../view', this.userData.Id], { relativeTo: this._route });
        }, 500);
      });
  }
}
