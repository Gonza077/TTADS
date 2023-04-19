import { Component, ViewChild, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
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
  displayedColumns: string[] = ["name","address","gender","age","email","status","options"];

  constructor(
    private userService: UserService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.dataSource.data = data;
    })
  }

  editUser(id: any) {
    //codigo aqui
    this.toast.success("Usuario editado")
    this.getUsers();
  }

  deleteUser(id: any) {
    //codigo aqui
    this.toast.error("Usuario eliminado")
    this.getUsers();
  }

  blockUser(id: any){ 
    //codigo aqui
    this.toast.error("usuario bloqueado");
    this.getUsers();
  }

  unblockUser(id: any){
    //codigo aqui
    this.toast.success("usuario desbloqueado");
    this.getUsers();
  }

  applyFilter(event :Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

