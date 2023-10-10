import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}
    mapType: string = this.route.snapshot.paramMap.get('mapType') || ''
    ngOnInit(): void {}
}
