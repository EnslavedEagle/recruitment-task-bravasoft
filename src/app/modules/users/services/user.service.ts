import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { User } from '@app/interfaces';

@Injectable()
export class UserService {
  private _limit = 15;
  private _userList: Observable<any>;

  constructor(private _http: HttpClient) {}

  public fetchUserPage(page: number): Observable<any> {
    const params = new HttpParams()
      .set('_page', (page + 1).toString())
      .set('_limit', this._limit.toString());
    const url = `${environment.apiUrl}/users`;
    return this._http.get(url, { params });
  }

  public fetchUserDetails(userId: string): Observable<User> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return <Observable<User>>this._http.get(url);
  }

  public updateUserDetails(userId: string, data: object): Observable<any> {
    const payload = <User>{ Id: userId, ...data };
    const url = `${environment.apiUrl}/users/${userId}`;
    return this._http.put(url, payload);
  }

  public createUser(data: object): Observable<any> {
    const payload = <User>data;
    const url = `${environment.apiUrl}/users`;
    return this._http.post(url, payload);
  }

  public deleteUser(userId: string): Observable<any> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this._http.delete(url);
  }
}
