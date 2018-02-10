import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class RoutingStateService {
  private _history = [];

  constructor(private _router: Router) {}

  public loadRouting(): void {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this._history = [...this._history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this._history;
  }

  public getPreviousUrl(): string {
    return this._history[this._history.length - 1] || '/';
  }
}
