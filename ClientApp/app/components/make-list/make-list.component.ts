import { ModelService } from './../../services/model.service';
import { MakeService } from './../../services/make.service';
import { Auth } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.css']
})
export class MakeListComponent implements OnInit {
  makes: any;
  makesList: any[];
  modelsList: any[];

  constructor(private auth: Auth,
              private makeService: MakeService,
              private modelService: ModelService) { }

  ngOnInit() {
       this.makeService.getMakes()
      .subscribe(makes => {this.makes = makes;
      this.sortData(this.makes);
      for(let make of this.makes)
        this.sortData(make.models);
      } 
    ); 
  }

   sortData(input: any): any{
      return input.sort((n1,n2) : number => {
              if (n1.name > n2.name) {
                  return 1;
              }
              if (n1.name < n2.name) {
                  return -1;
              }
                return 0;
            });
  }

}
