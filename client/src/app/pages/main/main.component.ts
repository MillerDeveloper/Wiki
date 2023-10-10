import { Component, OnInit } from '@angular/core'
import { PrimeIcons, TreeNode } from 'primeng/api'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    constructor() {}

    openedDialogs: any = {
        humanitarianAid: false,
        helpWithHouse: false,
        helpWithMoney: false,
        transport: false,
        helpWithHels: false
    }

    caraouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ]

    mainSteps = [
        {
            status: 'Пошук Волонтерів',
            icon: 'pi-cart-plus',
            subheader: 'Для найлегшої адаптації в нових умовах потрібно знайти волонтерів',
            text: 'Найперший крок, якій Вам потрібно зробити це знайти людей які зможуть Вам допомогти з усіма проблемами, в наш це волонтери. Вони допоможуть Вам і з житлом, і з харчуванням. Це перший і основний крок. Для пошуку волонтерів Вам потрібно звернутися до найближчої громади яка дасть контактні данні волонтерів.',
            color: '#9C27B0'
        },
        {
            status: 'Пошук житла',
            icon: 'pi-home',
            subheader:
                'Пошук житла займає значний час, тому цьому етапу потрібно приділяти особливу увагу',
            text: 'Якщо волонтери не змогли знайти Вам житло, Вам потрібно буде самим зайти на сайти для пошуку житла (див. вище). Також Ви повинні бути обережні, та пильні, щоб не натрапити на шахраїв які нікуди не зникли.',
            color: '#9C27B0'
        },
        {
            status: 'Гуманітарна Допомога',
            subheader: 'Будь-який громадянин України має право на отримання гумонітарної допомоги',
            text: 'В кожному місті є пункти видачі гуманітарної допомоги, Вам потрібно скористатись мапою (див. вище) яка показує найближчий пункт видачі гуманітарної допомоги.',
            icon: 'pi-map-marker',
            color: '#FF9800'
        },
        {
            status: 'Выплати ВПО',
            text: 'Для отримання виплати ВПО потрібно в застосунку Дія, скористатись сервісом "Отримати ВПО", потім ввести усі необхідні дані, та дочекатись поки їх опрацюють. Після цього виплата буде надходити на ту картку яку Ви вибрали при заповненні анкети.',
            icon: 'pi-money-bill',
            color: '#607D8B'
        }
    ]

    tree: TreeNode[] | any[] = [
        {
            label: 'Экстренна допомога',
            collapsedIcon: 'pi pi-bolt',
            children: [
                {
                    label: 'Пожар',
                    link: 'tel:102',
                    linkText: '101',
                    type: 'phone',
                    icon: 'local_fire_department'
                },
                {
                    label: 'Поліція',
                    link: 'tel:102',
                    linkText: '102',
                    type: 'phone',
                    icon: 'local_police'
                },
                {
                    label: 'Швидка допомога',
                    link: 'tel:102',
                    linkText: '103',
                    type: 'phone',
                    icon: 'medical_services'
                },
                {
                    label: 'Газова',
                    link: 'tel:102',
                    linkText: '104',
                    type: 'phone',
                    icon: 'gas_meter'
                }
            ]
        },
        {
            label: 'Психологічна допомога',
            collapsedIcon: 'pi pi-thumbs-up-fill',
            children: [
                {
                    label: 'Лінія запобігання самогубствам',
                    link: 'tel:7333',
                    linkText: '7333',
                    type: 'phone',
                    icon: 'local_fire_department'
                },
                {
                    label: 'ДСНС',
                    link: 'tel:0577666474',
                    linkText: '0577666474',
                    type: 'phone',
                    icon: 'local_police'
                }
            ]
        },
        {
            label: 'Пошкоджене майно',
            data: 'Documents Folder',
            collapsedIcon: 'pi pi-home',
            children: [
                {
                    label: 'Форма для заповнення',
                    link: 'https://diia.gov.ua/services/poshkodzhene-majno',
                    linkText: 'Дія',
                    type: 'url',
                    icon: 'local_fire_department'
                },
                {
                    label: 'Інструкція',
                    link: 'https://www.youtube.com/watch?v=eCkXhf6H_hY&ab_channel=%D0%94%D1%96%D1%8F',
                    linkText: 'YouTube',
                    type: 'url',
                    icon: 'local_police'
                }
            ]
        }
    ]

    ngOnInit(): void {}
}
