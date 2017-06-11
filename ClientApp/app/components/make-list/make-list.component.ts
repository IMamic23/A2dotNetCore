import { Auth } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.css']
})
export class MakeListComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
