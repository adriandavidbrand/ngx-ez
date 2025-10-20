import { Component } from '@angular/core';

import { EzControlBaseComponent } from '../../ez-control-base.component';

@Component({
    selector: 'ez-text',
    templateUrl: './ez-text.component.html',
    styleUrls: ['./ez-text.component.scss'],
    providers: [{ provide: EzControlBaseComponent, useExisting: EzTextComponent }],
    standalone: false
})
export class EzTextComponent extends EzControlBaseComponent<string> {}
