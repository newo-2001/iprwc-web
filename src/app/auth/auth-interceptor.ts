import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { take } from "rxjs/internal/operators/take";
import { Optional } from "../shared/optional.model";
import { AuthService } from "./auth.service";
import { UserInfo } from "./user-info.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userInfo.pipe(
            take(1),
            exhaustMap((userInfo: Optional<UserInfo>) => {
                if (userInfo?.token) {
                    req = req.clone({
                        setHeaders: { Authorization: `Bearer ${userInfo.token}`}
                    });
                }

                return next.handle(req);
            })
        );
    }
}