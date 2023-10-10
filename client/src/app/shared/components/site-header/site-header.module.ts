import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SiteHeaderComponent } from './site-header.component'
import { ButtonModule } from 'primeng/button'
import { DividerModule } from 'primeng/divider'
import { MenubarModule } from 'primeng/menubar'
import { AvatarModule } from 'primeng/avatar'
import { MenuModule } from 'primeng/menu'

@NgModule({
    declarations: [SiteHeaderComponent],
    imports: [CommonModule, ButtonModule, DividerModule, MenubarModule, AvatarModule, MenuModule],
    exports: [SiteHeaderComponent]
})
export class SiteHeaderModule {}
