import { SiteFooterModule } from './../../shared/components/site-footer/site-footer.module'
import { ButtonModule } from 'primeng/button'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MainRoutingModule } from './main-routing.module'
import { MainComponent } from './main.component'
import { SiteHeaderModule } from '@shared/components/site-header/site-header.module'
import { DividerModule } from 'primeng/divider'
import { CardModule } from 'primeng/card'
import { PanelModule } from 'primeng/panel'
import { TimelineModule } from 'primeng/timeline'
import { CarouselModule } from 'primeng/carousel'
import { TreeModule } from 'primeng/tree'
import { DialogModule } from 'primeng/dialog'

@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        SiteHeaderModule,
        DividerModule,
        CardModule,
        ButtonModule,
        PanelModule,
        TimelineModule,
        TreeModule,
        SiteFooterModule,
        CarouselModule,
        DialogModule
    ]
})
export class MainModule {}
