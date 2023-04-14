import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from 'src/app/services/local/local.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  @Input()
  pageSize!: number;
  
  locals!:any[];

  lenght!: number;
  pageNum: number = 0;
  pageSizeOptions = [5, 10, 20]
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name","address","options"];

  constructor(
    private localService: LocalService,
    public userService:UserService
  ) {}
 
  getLocals(){
    this.localService.getLocalsData().subscribe(
      (data: any) => {
        this.locals = data;
        this.dataSource =data
      }
    )
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getLocals();
  }

  editLocal(id: any) {
    console.log("local editado")
    this.getLocals();
  }

  deleteLocal(id: any) {
    console.log("local eliminado")
    this.getLocals();
  }

    //-------------------------------PAGINADOR-------------------------------
    @ViewChild('paginator') paginator !: MatPaginator;
    @ViewChild('empTbSort') empTbSort !: MatSort;
    ngAfterViewInit() {
      //Esto para pasarle el dato del paginador
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empTbSort;
    }
  
    handlePage(e: PageEvent) {
      this.pageNum = e.pageIndex + 1;
      this.pageSize = e.pageSize;
    }
    //-------------------------------PAGINADOR-------------------------------
}

