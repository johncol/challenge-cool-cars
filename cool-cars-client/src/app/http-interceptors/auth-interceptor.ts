import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly host: string = 'localhost:8080';

  constructor(private oktaAuthService: OktaAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return Observable.fromPromise(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<any> {
    if (this.requestIsSentToApi(request)) {
      // this.addTokenToRequestHeaders(request);
      const accessToken: string = await this.oktaAuthService.getAccessToken();
      request = request.clone({
        setHeaders: { 'Authorization': 'bearer ' + accessToken }
      });
    }
    return next.handle(request).toPromise();
  }

  private requestIsSentToApi(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf(this.host) > -1;
  }

  private async addTokenToRequestHeaders(request: HttpRequest<any>): Promise<any> {
    const accessToken: string = await this.oktaAuthService.getAccessToken();
    request = request.clone({
      setHeaders: { 'Authorization': 'bearer ' + accessToken }
    });
  }

}