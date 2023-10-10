import { Component, Input, OnInit } from '@angular/core'
import { IUser } from '@globalInterfaces/user.interface'
import { ThemeService } from '@services/theme/theme.service'
import { MenuItem } from 'primeng/api'
import { USER_STORAGE_KEY } from '@shared/constants/user.contants'
import { Router } from '@angular/router'
import { AuthService } from '@services/auth/auth.service'

const THEME_STORAGE_KEY = 'selectedTheme'
const LIGHT_THEME = 'lara-light-blue'
const DARK_THEME = 'lara-dark-purple'

@Component({
    selector: 'app-site-header',
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
    @Input() isMainPage: boolean = false
    constructor(
        private readonly themeService: ThemeService,
        public readonly authService: AuthService,
        private readonly router: Router
    ) {}

    currentTheme: string = localStorage.getItem(THEME_STORAGE_KEY) || LIGHT_THEME
    userInStore: string = localStorage.getItem(USER_STORAGE_KEY) ?? ''
    user: IUser | any = this.userInStore.length > 0 ? JSON.parse(this.userInStore) : {}
    darkTheme: string = DARK_THEME
    userMenuItems: MenuItem[] = [
        { label: 'Вийти', icon: 'pi pi-fw pi-sign-out', command: this.logout.bind(this) }
    ]
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

    ngOnInit() {
        this.themeService.switchTheme(this.currentTheme)
    }

    logout(): void {
        this.authService.logout()
        this.router.navigate(['/'])
    }

    toogleTheme() {
        if (this.currentTheme === LIGHT_THEME) {
            this.themeService.switchTheme(DARK_THEME)
            this.currentTheme = DARK_THEME
        } else {
            this.themeService.switchTheme(LIGHT_THEME)
            this.currentTheme = LIGHT_THEME
        }

        localStorage.setItem(THEME_STORAGE_KEY, this.currentTheme)
    }
}
