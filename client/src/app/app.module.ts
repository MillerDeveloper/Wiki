import { ToastModule } from 'primeng/toast'
import { MessagesModule } from 'primeng/messages'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CookieService } from 'ngx-cookie-service'
import { MessageService } from 'primeng/api'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MessagesModule,
        ToastModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [CookieService, MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
