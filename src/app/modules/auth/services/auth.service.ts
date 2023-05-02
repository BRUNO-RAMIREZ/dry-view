import {HostListener, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {UserAuthRequest, UserAuthResponse} from "../../../core/models/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseURL: string;
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly CREDENTIALS_KEY = 'credentials';
  private timeout: any;

  constructor(private _http: HttpClient, private router: Router) {
    this._baseURL = environment.baseURL;
  }

  public login(userAuthRequest: UserAuthRequest): Observable<UserAuthResponse> {
    return this._http.post<UserAuthResponse>(`${this._baseURL}/auth`,userAuthRequest);
  }

  public setAuthToken(token: string, credentials: any): void {
    sessionStorage.setItem(this.AUTH_TOKEN_KEY, token);
    sessionStorage.setItem(this.CREDENTIALS_KEY, JSON.stringify(credentials));
    //console.log(token, credentials);
  }

  public getAuthToken(): string | null{
    return sessionStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  public getCredentials(): any {
    const credentialsString = sessionStorage.getItem(this.CREDENTIALS_KEY);
    return credentialsString ? JSON.parse(credentialsString) : null;
  }

  public logout(): void {
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
    sessionStorage.removeItem(this.CREDENTIALS_KEY);

  }

  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  public reset(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.logout();
      this.router.navigate(['/auth']);
    }, 300000);
  }
}
