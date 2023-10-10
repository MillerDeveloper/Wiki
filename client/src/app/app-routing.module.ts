import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'maps/:mapType',
        loadChildren: () => import('./pages/maps/maps.module').then((m) => m.MapsModule)
    },
    { path: '**', redirectTo: '' }
]

const routerOptions: ExtraOptions = {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
}

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
