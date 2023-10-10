import { CookieService } from 'ngx-cookie-service'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IUser } from '@globalInterfaces/user.interface'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) {}
    private token!: string

    login(user: IUser): Observable<{ user: IUser; token: string }> {
        return this.http.post<{ user: IUser; token: string }>(
            `${environment.serverApi}/auth/login`,
            user
        )
    }

    register(data: Object): Observable<{ user: IUser }> {
        return this.http.post<{ user: IUser }>(`${environment.serverApi}/auth/register`, data)
    }

    setToken(token: string): void {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    get isLoginedIn() {
        return !!this.getToken() || !!this.cookieService.check('token')
    }

    logout() {
        this.setToken('')
        this.cookieService.deleteAll()
        localStorage.clear()
    }
}
