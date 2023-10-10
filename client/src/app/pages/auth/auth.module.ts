import { DividerModule } from 'primeng/divider'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { AuthComponent } from './auth.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { SiteHeaderModule } from '@shared/components/site-header/site-header.module'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { PasswordModule } from 'primeng/password'
import { CheckboxModule } from 'primeng/checkbox'
import { ReactiveFormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { MessagesModule } from 'primeng/messages'
import { ToastModule } from 'primeng/toast'

@NgModule({
    declarations: [AuthComponent, LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SiteHeaderModule,
        InputTextModule,
        DividerModule,
        ButtonModule,
        PasswordModule,
        CheckboxModule,
        ReactiveFormsModule,
        MessagesModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class AuthModule {}
