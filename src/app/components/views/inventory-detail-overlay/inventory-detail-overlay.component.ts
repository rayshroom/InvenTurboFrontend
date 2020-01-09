import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-inventory-detail',
    templateUrl: './inventory-detail-overlay.component.html',
    styleUrls: ['./inventory-detail-overlay.component.scss']
})
export class InventoryDetailOverlayComponent {
    @Input() item;
    constructor(public activeModal: NgbActiveModal) {}
}
