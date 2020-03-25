import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-font-awesome-icon-wrapper',
    templateUrl: './font-awesome-icon-wrapper.component.html',
    styleUrls: ['./font-awesome-icon-wrapper.component.scss']
})
export class FontAwesomeIconWrapperComponent implements OnInit {
    @Input() faClass: string;

    @Input() hoverable: boolean;

    constructor() {}

    ngOnInit(): void {
        this.hoverable = this.hoverable !== undefined;
    }
}
