import { Component, OnInit, Input } from '@angular/core';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  locals!:any[];

  constructor(
    private localService: LocalService,
  ) {}
 
  ngOnInit(): void {
    this.localService.getLocalsData().subscribe(
      (data: any) => {
        this.locals = data;
        console.log(data);
      }
    )
  }

  message(){
    alert("COF COF")
  }
}

