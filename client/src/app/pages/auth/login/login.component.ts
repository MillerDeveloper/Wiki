import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@services/auth/auth.service'
import { ErrorHandlerService } from '@services/error-handler/error-handler.service'
import { Subscription } from 'rxjs'
import { Md5 } from 'ts-md5'
import { CookieService } from 'ngx-cookie-service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly errorHandlerService: ErrorHandlerService,
        private readonly cookieService: CookieService
    ) {}

    subscription: Subscription = new Subscription()

    loginForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        database: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        saveToken: new FormControl(true)
    })

    ngOnInit(): void {}

    login() {
        this.loginForm.disable()
        const data = this.loginForm.value
        data.password = Md5.hashStr(data.password)

        this.subscription.add(
            this.authService.login(data).subscribe({
                next: ({ user, token }) => {
                    localStorage.setItem('userInfo', JSON.stringify(user))
                    if (this.loginForm.value.saveToken) {
                        this.cookieService.set('token', token, {
                            expires: 7
                        })
                    }

                    this.authService.setToken(token)
                    this.loginForm.enable()
                    this.router.navigate([''])
                },
                error: (error: any) => {
                    this.errorHandlerService.handleError(error)
                    this.loginForm.enable()
                }
            })
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
