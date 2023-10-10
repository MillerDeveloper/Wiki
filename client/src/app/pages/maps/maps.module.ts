import {SiteHeaderModule} from '@shared/components/site-header/site-header.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';


@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    SiteHeaderModule
  ]
})
export class MapsModule { }
