import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SiteFooterComponent } from './site-footer.component'
import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar'

@NgModule({
    declarations: [SiteFooterComponent],
    imports: [CommonModule, ButtonModule, MenubarModule],
    exports: [SiteFooterComponent]
})
export class SiteFooterModule {}
