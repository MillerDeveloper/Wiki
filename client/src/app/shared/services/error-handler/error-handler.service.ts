import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(private readonly messageService: MessageService) {}

    handleError(error: Error | any) {
        if (!environment.production) {
            console.error(error)
        }

        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message ?? 'Виникла помилка. Спробуйте пізніше'
        })
    }
}
