import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { UserInfo } from "./user-info.model";
import { LoginDto } from "./login/login-dto.model";
import { User } from "./user.model";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { RegisterDto } from "./register/register-dto.model";
import { Optional } from "../shared/optional.model";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    userInfo: BehaviorSubject<Optional<UserInfo>> = new BehaviorSubject<Optional<UserInfo>>(null);

    constructor(private http: HttpClient) {}

    logout(): void {
        this.userInfo.next(null);
        localStorage.removeItem("userInfo");
    }

    login(credentials: LoginDto): Observable<User> {
        return this.http.post<UserInfo>("/auth/login", credentials).pipe(
            tap((userInfo) => this.authenticate(userInfo)),
            map((userInfo: UserInfo): User => userInfo.user)
        );
    }

    register(credentials: RegisterDto): Observable<User> {
        return this.http.post<UserInfo>("/auth/register", credentials).pipe(
            tap((userInfo) => this.authenticate(userInfo)),
            map((userInfo: UserInfo): User => userInfo.user)
        );
    }

    isLoggedIn(): boolean {
        const token = this.userInfo.getValue()?.token;
        if (!token) return false;

        const jwt: JwtPayload = jwt_decode(token);
        return Math.floor(new Date().getTime() / 1000) < (jwt.exp ?? Infinity)
    }

    autoLogin(): void {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            this.userInfo.next(JSON.parse(userInfo));
        }
    }

    authenticate(userInfo: UserInfo): void {
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        this.userInfo.next(userInfo);
    }
}