import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from 'src/app/services/local/local.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsComponent } from '../products/products.component';
import { LocalDeleteComponent } from '../local-delete/local-delete.component';
import { LocalEditComponent } from '../local-edit/local-edit.component';
import { ToastrService } from 'ngx-toastr';
import { LocalAddComponent } from '../local-add/local-add.component';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  locals!: any[];

  constructor(
    private localService: LocalService,
    public userService: UserService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.changeFilters();
    this.getLocals();
  }

  getLocals() {
     this.localService.getLocals().subscribe(
      (data: any) => {
        this.locals = data;
        this.dataSource.data = data;
      }
    )
  }

  editLocal(local: any) {
    const dialogRef = this.dialog.open(LocalEditComponent, {
      data: local,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.getLocals();
      } 
    });
  }

  deleteLocal(local: any) {
    const dialogRef = this.dialog.open(LocalDeleteComponent,{
       data: local 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLocals();
      }
    });
  }

  createLocal() {
    const dialogRef = this.dialog.open(LocalAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLocals();
      }
    });
  }

  openProducts(local: any) {
    const dialogRef = this.dialog.open(ProductsComponent, { 
      data: local 
    });
  }

  //-------------------------------TABLE-------------------------------
  displayedColumns: string[] = ["name", "address", "phone", "description", "products", "options"];
  filterColumns: string[] = ["name", "address", "phone"];
  filterValue: any;
  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  changeFilters() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return (
        data.name.toLowerCase().includes(filter) || 
        data.address.toLowerCase().includes(filter) || 
        data.phone.toString().includes(filter)
      );
    };
  }

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

