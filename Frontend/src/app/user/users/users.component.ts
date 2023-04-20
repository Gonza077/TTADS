import { Component, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {

  constructor(
    private userService: UserService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.changeFilters();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.dataSource.data = data;
    })
  }

  editUser(id: any) {
    const dialogRef = this.dialog.open(UserEditComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.toast.success("Usuario editado")
      }
      console.log(`Local editado => Dialog result: ${result }`);
    });
    this.getUsers();
  }

  deleteUser(id: any) {
    const dialogRef = this.dialog.open(UserDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        //codigo aca
        this.toast.error("Usuario eliminado");
      }
      console.log(`Local eliminado => Dialog result: ${result }`);
    }); 
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

  //-------------------------------TABLE-------------------------------
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name","address","email","status","options"];
  filterColumns: string[]= ["name","address" ,"email"];
  filterValue:any;

  changeFilters(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = function (data : any, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.address.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter) ;
    };
  }

  applyFilter(event :Event){
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
   //-------------------------------TABLE-------------------------------

  //-------------------------------PAGINADOR-------------------------------
  pageSize!: number;
  lenght!: number;
  pageNum: number = 0;
  pageSizeOptions = [5, 10, 20]

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

