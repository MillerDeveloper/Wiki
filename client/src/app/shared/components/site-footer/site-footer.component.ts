import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
    selector: 'app-site-footer',
    templateUrl: './site-footer.component.html',
    styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit {
    constructor() {}

    menuItems: MenuItem[] = [
        {
            label: 'Головна',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/']
        },
        {
            label: 'Послуги',
            icon: 'pi pi-fw pi-heart',
            routerLink: ['/'],
            fragment: 'services'
        },
        {
            label: 'Питання',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/'],
            fragment: 'questions'
        },
        {
            label: 'Мапы',
            icon: 'pi pi-fw pi-map',
            items: [{ label: 'Мапа війни', routerLink: 'maps/war' }]
        }
    ]

    ngOnInit(): void {}
}
