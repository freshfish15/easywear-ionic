import { Injectable } from '@angular/core';
import {environment as env} from "../../environments/environment";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { catchError, filter, mapTo, take, tap } from 'rxjs/operators';
import { TokenResponse } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class EmtailorService {
  private http: HttpClient;
  private _rawToken: BehaviorSubject<string>;
  private _token: Observable<string>;



  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
    this._rawToken = new BehaviorSubject('');
    this._token = this._rawToken.pipe(filter((token) => token.length > 0));
    this.refreshToken();
  }

  private storeToken(token: string) {
    env.apiToken = token;
  }

  refreshToken(): void {
    const authUrl = `${env.apiBase}/auth/token`;
    const appKey = env.appKey;
    const appSecret = env.appSecret;
    const that = this;
    const timestamp = Date.now();
    this.http
      .post<TokenResponse>(authUrl, {appKey, appSecret})
      .subscribe((result) => {
        if (result.code !== '0') {
          throw new Error(result.msg);
        } else {
          this._rawToken.next(result.data.token);
          console.log("get token: " + result.data.token);
          env.apiToken = result.data.token;
          console.log("env token = : " + env.apiToken);
          let expiry: number;
          try {
            expiry = Number.parseInt(result.data.expirationMin) * 60000;
          } catch (e) {
            expiry = 82800000;
          }
          const timeBeforeRefresh = timestamp + expiry;
          setTimeout(() => {
            this.refreshToken, Math.max(timeBeforeRefresh, 0)
          });
        }
      });
  }
}


