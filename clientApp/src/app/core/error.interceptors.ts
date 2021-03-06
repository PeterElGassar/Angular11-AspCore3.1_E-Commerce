
import { Router } from '@angular/router';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class ErrorInterceptors implements HttpInterceptor {

    constructor(private router: Router) {


    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                
                if (error) {
                    if (error.status === 404) {
                        this.router.navigateByUrl('/not-found');
                    }
                }
                if (error) {
                    if (error.status === 500) {
                        this.router.navigateByUrl('/server-error');
                    }
                }
                return throwError(error);
            })
        )
    }

}