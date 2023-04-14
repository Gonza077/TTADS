import { Component, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  @Input()
  pageSize!: number;

  lenght!: number;
  pageNum: number = 0;
  pageSizeOptions = [5, 10, 20]
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name","address","gender","age","email", "options"];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getUsers();
  }

  getUsers() {
    // this.userService.getUsers().subscribe(
    //   (data: any) => {
    //     this.dataSource.data = data;
    // })
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.dataSource.data = data;
    })
  }

  editUser(id: any) {
    console.log("usuario editado")
    this.getUsers();
  }

  deleteUser(id: any) {
    console.log("usuario eliminado")
    this.getUsers();
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

