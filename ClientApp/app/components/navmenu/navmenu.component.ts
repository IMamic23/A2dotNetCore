import { Auth } from './../../services/auth.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

       constructor(public auth: Auth) {
    }

}
