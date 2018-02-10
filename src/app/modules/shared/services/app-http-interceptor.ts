import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${environment.apiKey}`)
    });
    return next.handle(authReq);
  }
}
