import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../shared/shared-module/loader/LoaderService';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    var authReq;
  debugger;  if (!req.url.includes('UploadFile')) {
       if(localStorage.getItem('token')) {
        authReq = req.clone({
          headers: req.headers
            .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        });
      }else{
        authReq = req.clone({
          headers: req.headers
        });
      }
     
    } else {
      authReq = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
    }

    console.log();
    let timeExeded = false;
    const time = setTimeout(() => {
      this.loaderService.show();
      timeExeded = true;
    }, 300);
    return next.handle(authReq).pipe(
      finalize(() => {
        if (!timeExeded) {
          clearTimeout(time);
        }
        this.loaderService.hide();
      }),
     
    );
  }
}
