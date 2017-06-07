import { Component, Input } from '@angular/core';
import { AdditionalInfo } from "../models/vehicle";

@Component({
    selector: 'rb-additional-info',
    templateUrl: 'additional-info.component.html',
    styleUrls: ['additional-info.component.css']
})

export class AdditionalInfoComponent {
    @Input() additionalInfoTitle: any;
    @Input() additionalInfoValue: any;
}

