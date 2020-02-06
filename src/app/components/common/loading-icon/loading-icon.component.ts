import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-loading-icon',
    templateUrl: './loading-icon.component.html',
    styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent implements OnInit {
    @Input()
    public message: string;

    constructor() {}

    ngOnInit() {}
}
