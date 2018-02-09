import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'environments/environment';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { User } from '@app/interfaces';

@Injectable()
export class UserService {
  private _limit = 15;
  private _userListSubject: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient) {}

  // public watchUserPages() {
  //   return this._userListSubject.asObservable();
  // }

  public fetchUserPage(page: number): Observable<any> {
    const params = new HttpParams()
      .set('_page', (page + 1).toString())
      .set('_limit', this._limit.toString());
    const url = `${environment.apiUrl}/users`;
    console.log('Trying to fetch User page from: ' + url);
    return this._http
      .get(url, { params })
      .debounceTime(500)
      .distinctUntilChanged();
  }
}
