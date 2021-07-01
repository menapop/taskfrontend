import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { AccountService, InputRefreshTokenDto, InputSignInUserDto } from '../swagger/SwaggerGenerated';

export const TOKEN_NAME = 'token';
export const REFRESH_TOKEN_NAME = 'refreshToken';
@Injectable()
export class AuthService {
  constructor( private accountService:AccountService
            
  ) {}

  currentPage = 0;



  isLogin(): boolean {
    if (this.getToken() !== null && !this.isTokenExpired(this.getToken())) {
      return true;
    } else {
      return false;
    }
  }
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }
  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded : any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  

  getRoleId() {
    const decoded :any  = jwt_decode(this.getToken());

    if (decoded.Roles === undefined) {
      return null;
    }

    return decoded.Roles.split(',');
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(inputSignInUserDto: InputSignInUserDto): Promise<boolean> {
    return this.accountService
      .signIn(inputSignInUserDto)
      .toPromise()
      .then(
        (value) => {
          if(value==null)
              return false;
          this.setToken(value.token);
          this.setRefreshToken(value.refreshToken);
          this.refreshToken(value.token, value.refreshToken);

          return true;
        },
        (error) => {
          return false;
        }
      );
  }

 
  refreshToken(token, refreshToken) {
    const millisTill10 = new Date(this.getTokenExpirationDate(token)).getTime() - new Date().getTime();

    const time = setTimeout(() => {
      this.accountService
        .token({
          token,
          refreshToken,
        } as InputRefreshTokenDto)
        .subscribe(
          (value) => {
            this.setRefreshToken(value.refreshToken);
            this.setToken(value.token);
            this.setRefreshToken(value.refreshToken);
            this.refreshToken(value.token, value.refreshToken);
          },
          (error) => {
            clearTimeout(time);
          }
        );
    }, millisTill10);
  }
  refreshCurrentToken(): Promise<boolean> {
    if (this.getToken() == null) {
      return new Promise((value) => value(false));
    }
    return this.accountService
      .token({
        token: this.getToken(),
        refreshToken: this.getRefreshToken(),
      } as InputRefreshTokenDto)
      .toPromise()
      .then(
        (value) => {
          this.setRefreshToken(value.refreshToken);
          this.setToken(value.token);
          this.refreshToken(value.token, value.refreshToken);
          return true;
        },
        (error) => {
          return false;
        }
      );
      }
  }

