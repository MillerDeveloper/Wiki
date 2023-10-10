import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@services/auth/auth.service'
import { ErrorHandlerService } from '@services/error-handler/error-handler.service'
import { Subscription } from 'rxjs'
import { Md5 } from 'ts-md5'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly errorHandlerService: ErrorHandlerService
    ) {}

    ngOnInit(): void {}

    subscription: Subscription = new Subscription()
    registerForm: FormGroup = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        surname: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        passwordConfirm: new FormControl(null, [Validators.required])
    })

    register() {
        this.registerForm.disable()
        const data = this.registerForm.value

        if (data.password === data.passwordConfirm) {
            data.password = Md5.hashStr(data.password)
            data.passwordConfirm = data.password

            this.subscription.add(
                this.authService.register(data).subscribe({
                    next: () => {
                        this.router.navigateByUrl('auth/login')
                    },
                    error: (error: any) => {
                        this.errorHandlerService.handleError(error)
                        this.registerForm.enable()
                    }
                })
            )
        } else {
            this.registerForm.enable()
            throw new Error('Password are not equals')
        }
    }
}
